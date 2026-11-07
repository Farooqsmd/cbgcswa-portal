import React, { useState, useRef } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  Printer, 
  Download, 
  ShieldCheck, 
  CreditCard, 
  AlertCircle,
  User,
  Camera,
  Search,
  Clock,
  RefreshCw,
  Check,
  X,
  UploadCloud,
  Lock,
  ArrowRight,
  Copy
} from 'lucide-react';
import { associationInfo } from '../data/associationData';

export default function MembershipSection() {
  const [activeTab, setActiveTab] = useState('register'); // 'register' | 'status'

  // --- Registration Form State ---
  const [formData, setFormData] = useState({
    fullName: '',
    staffId: '',
    cadre: 'Officer Scale I',
    branchName: '',
    dpCode: '',
    circleOffice: '',
    mobile: '',
    email: '',
    address: '',
    paymentMode: 'annual',
    transactionId: '',
    agreeRules: false
  });

  const [photoBase64, setPhotoBase64] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef(null);

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Status Check State ---
  const [searchStaffId, setSearchStaffId] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const [photoUpdateSuccess, setPhotoUpdateSuccess] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const cardPhotoInputRef = useRef(null);

  const handleCopyAccountNo = () => {
    const accNo = associationInfo.bankAccount?.accountNumber || '110112092968';
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(accNo);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2500);
    }
  };

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBYqrpI9_1dLlVt69aOswwb-cdw_36AQa7LUzZGG-eiqFsyECWm0cgR7pVEckl7yoKuA/exec';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Convert any Google Drive URL into a direct Google CDN link that loads with HTTP 200 and no redirects
  const formatPhotoUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (
      trimmed === 'Approved' || 
      trimmed === 'Pending Review' || 
      trimmed.toLowerCase().includes('error') ||
      trimmed.length < 5
    ) {
      return '';
    }

    // Base64 data URL
    if (trimmed.startsWith('data:image/')) return trimmed;

    // Extract file ID from Google Drive URL if present
    const driveMatch = trimmed.match(/[-\w]{25,}/);
    if (driveMatch) {
      // Direct CDN endpoint that returns HTTP 200 OK directly with Access-Control-Allow-Origin: *
      return `https://lh3.googleusercontent.com/d/${driveMatch[0]}`;
    }

    return trimmed;
  };

  // Client-side photo compression to passport dimensions (~400x400 max, ~40-60KB JPEG)
  const compressImageFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 400;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL('image/jpeg', 0.80);
          resolve(compressed);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    setPhotoError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('File is larger than 5MB. Please choose a smaller photo.');
      return;
    }

    try {
      const compressed = await compressImageFile(file);
      setPhotoBase64(compressed);
      setPhotoPreview(compressed);
    } catch (err) {
      setPhotoError('Could not process image. Please try another photo.');
    }
  };

  const handleRemovePhoto = () => {
    setPhotoBase64('');
    setPhotoPreview('');
    setPhotoError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Upload or replace photo directly from the ID card
  const handleCardPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !searchResult) return;

    try {
      setUpdatingPhoto(true);
      const compressed = await compressImageFile(file);
      
      // Update local card preview instantly
      setSearchResult((prev) => ({
        ...prev,
        photoUrl: compressed
      }));
      setPhotoUpdateSuccess(true);
      setTimeout(() => setPhotoUpdateSuccess(false), 6000);

      // Save to Google Drive & update Sheet in background
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'updatePhoto',
          staffId: searchResult.staffId,
          fullName: searchResult.fullName,
          photoBase64: compressed
        })
      });
    } catch (err) {
      console.warn('Photo update notice:', err);
    } finally {
      setUpdatingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.transactionId || !formData.transactionId.trim()) {
      alert('Please enter your Payment Transaction ID / UTR Number.');
      return;
    }
    if (!formData.agreeRules) {
      alert('Please agree to abide by the rules and bye-laws of the Association.');
      return;
    }

    setIsSubmitting(true);
    const refNumber = `CBGCSWA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const payload = {
      ...formData,
      referenceNumber: refNumber,
      submissionDate: submissionDate,
      photoBase64: photoBase64,
      photoName: `Photo_${formData.staffId}_${formData.fullName.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
    };

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn('Google Sheets transmission note:', err);
    } finally {
      setSubmittedData({
        ...payload,
        photoUrl: photoPreview
      });
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setPhotoBase64('');
    setPhotoPreview('');
    setPhotoError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFormData({
      fullName: '',
      staffId: '',
      cadre: 'Officer Scale I',
      branchName: '',
      dpCode: '',
      circleOffice: '',
      mobile: '',
      email: '',
      address: '',
      paymentMode: 'annual',
      transactionId: '',
      agreeRules: false
    });
  };

  // Reset the status check screen (privacy clear)
  const handleClearSearch = () => {
    setSearchResult(null);
    setSearchStaffId('');
    setSearchError('');
  };

  // --- Status Check Handler ---
  const handleCheckStatus = async (e) => {
    e?.preventDefault();
    const queryId = searchStaffId.trim();
    if (!queryId) {
      setSearchError('Please enter a Staff Roll Number.');
      return;
    }

    setSearchLoading(true);
    setSearchError('');
    setSearchResult(null);

    try {
      const endpoint = `${GOOGLE_SCRIPT_URL}?action=checkStatus&staffId=${encodeURIComponent(queryId)}`;
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data && data.found) {
        setSearchResult(data.data);
      } else {
        setSearchError(data?.message || `No registration found for Staff Roll No: ${queryId}. Please verify the number or submit a new registration.`);
      }
    } catch (err) {
      console.error('Status check error:', err);
      setSearchError('Unable to connect to membership database. Please check your connection or try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <section id="membership" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Membership Portal
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            Join the Association &amp; Secure Your Member Identity Card
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every General Category employee (Officer, Clerk, or Sub-staff) of Canara Bank across India is eligible to join. Unite with us to protect your service rights and secure our common welfare.
          </p>
        </div>

        {/* Tab Navigation Toggle */}
        <div className="flex justify-center mb-10 no-print">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300 shadow-inner max-w-md w-full sm:w-auto">
            <button
              onClick={() => { 
                setActiveTab('register'); 
                setSearchError(''); 
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>1. New Registration</span>
            </button>

            <button
              onClick={() => { 
                // Always reset on tab switch so another member starts with a fresh search!
                setActiveTab('status');
                handleClearSearch();
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'status'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>2. Check Status &amp; ID Card</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: NEW REGISTRATION FORM
            ======================================================== */}
        {activeTab === 'register' && (
          <>
            {/* Fee Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">One-Time</span>
                  <div className="text-2xl font-black text-slate-900 mt-1 mb-2">&#8377;10 Only</div>
                  <h3 className="font-bold text-sm text-slate-800">Admission Fee</h3>
                  <p className="text-xs text-slate-600 mt-1">Nominal one-time admission fee as prescribed in Bye-Law Rule 2.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Prescribed in Bye-laws
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Annual Option</span>
                  <div className="text-2xl font-black text-white mt-1 mb-2">&#8377;1,296 / Year</div>
                  <h3 className="font-bold text-sm text-amber-200">Welfare Subscription</h3>
                  <p className="text-xs text-slate-300 mt-1">Convenient once-a-year subscription dedicated entirely to member welfare and legal aid.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-800/80 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Zero Commercial Expenses
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="max-w-3xl mx-auto">
              {!submittedData ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        Online Membership Enrolment Form
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Fill in your details and upload your passport photo for your Official Member ID Card.
                      </p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-800">
                        Form Mode: Online
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Passport Photo Upload Field */}
                    <div className="bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-100">
                      <div className="flex flex-col sm:flex-row items-center gap-5">
                        {/* Preview Box */}
                        <div className="relative shrink-0">
                          <div className="w-28 h-32 rounded-xl border-2 border-dashed border-blue-400 bg-white flex flex-col items-center justify-center overflow-hidden shadow-inner">
                            {photoPreview ? (
                              <img 
                                src={photoPreview} 
                                alt="Passport Preview" 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-center p-2 text-slate-400">
                                <Camera className="w-8 h-8 text-blue-400 mb-1" />
                                <span className="text-[10px] font-bold uppercase text-slate-500">Passport Photo</span>
                              </div>
                            )}
                          </div>
                          {photoPreview && (
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              title="Remove photo"
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Upload Controls & Instructions */}
                        <div className="flex-1 text-center sm:text-left">
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
                            Passport Size Photograph <span className="text-red-500">*</span>
                          </label>
                          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                            Attach a clear passport-style color photo. This photo will be saved to your membership record and printed on your <strong>Official Member ID Card</strong>.
                          </p>

                          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handlePhotoUpload}
                              className="hidden"
                              id="photoUploadInput"
                            />
                            <label
                              htmlFor="photoUploadInput"
                              className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-colors"
                            >
                              <Camera className="w-3.5 h-3.5 text-amber-300" />
                              <span>{photoPreview ? 'Change Photo' : 'Select Photo (JPG / PNG)'}</span>
                            </label>

                            {photoPreview && (
                              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached
                              </span>
                            )}
                          </div>

                          {photoError && (
                            <p className="text-xs text-red-600 mt-2 font-medium">{photoError}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Employee Personal Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Full Name of Employee <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Staff Roll No. / Employee ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="staffId"
                          required
                          value={formData.staffId}
                          onChange={handleInputChange}
                          placeholder="e.g. 82302"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Cadre / Designation <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="cadre"
                          value={formData.cadre}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all"
                        >
                          <option value="Officer Scale I">Officer (Scale I - JMGS)</option>
                          <option value="Officer Scale II">Manager (Scale II - MMGS)</option>
                          <option value="Officer Scale III">Senior Manager (Scale III - MMGS)</option>
                          <option value="Officer Scale IV">Chief Manager (Scale IV - SMGS)</option>
                          <option value="Officer Scale V+">Assistant General Manager (Scale V+)</option>
                          <option value="Clerk">Clerk / Special Assistant</option>
                          <option value="Sub-Staff">Sub-Staff / Peon / Daftary</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Branch Name &amp; DP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="branchName"
                          required
                          value={formData.branchName}
                          onChange={handleInputChange}
                          placeholder="e.g. Nandyal Branch (DP: 1234)"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Circle Office / Regional Office <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="circleOffice"
                          required
                          value={formData.circleOffice}
                          onChange={handleInputChange}
                          placeholder="e.g. Kurnool RO / Hyderabad Circle"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          pattern="[0-9]{10}"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. name@canarabank.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>

                    {/* Official Association Bank Account Details Card */}
                    <div className="bg-emerald-50/90 border-2 border-emerald-500/50 rounded-2xl p-5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-emerald-200">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xs shadow-sm shrink-0">
                            CB
                          </div>
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 block">
                              Official Association Bank Account
                            </span>
                            <span className="text-xs text-emerald-700 font-bold">
                              Canara Bank &bull; Subscription Remittance
                            </span>
                          </div>
                        </div>
                        <div className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 w-fit">
                          Fee: &#8377;1,306 (Annual: &#8377;1,296 + &#8377;10 Admission)
                        </div>
                      </div>

                      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase text-emerald-800 block">
                            Account Name:
                          </span>
                          <div className="text-sm font-extrabold text-slate-900 leading-snug">
                            {associationInfo.bankAccount.shortAccountName}
                          </div>
                          <div className="text-xs text-slate-600 font-medium">
                            (Canara Bank General Category Staff Welfare Association)
                          </div>
                        </div>

                        <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold uppercase text-emerald-800">
                              Account Number:
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyAccountNo}
                              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer bg-emerald-100 hover:bg-emerald-200 px-2.5 py-0.5 rounded-md transition-colors"
                            >
                              {copiedAccount ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>Copy A/c</span>
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div 
                            onClick={handleCopyAccountNo}
                            title="Click to copy account number"
                            className="bg-[#0b5345] hover:bg-[#084237] text-white font-mono font-black text-lg sm:text-xl py-2 px-3 rounded-lg text-center tracking-wider shadow-inner cursor-pointer transition-colors"
                          >
                            {associationInfo.bankAccount.accountNumber}
                          </div>
                          <div className="text-[10px] text-emerald-700 italic text-center mt-1">
                            ({associationInfo.bankAccount.verificationNote})
                          </div>
                        </div>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-emerald-200 text-[11px] text-emerald-800 leading-relaxed">
                        <strong>Payment Instructions:</strong> Transfer the subscription fee using Canara Bank NetBanking, Mobile Banking (CANDI), NEFT, IMPS, or any UPI app to the account above. Copy the <strong>Transaction ID / UTR</strong> and paste it into the field below.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Payment Preference <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="paymentMode"
                          value={formData.paymentMode}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all cursor-pointer"
                        >
                          <option value="annual">Annual Subscription (&#8377;1,296 + &#8377;10 Admission = &#8377;1,306)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                          Payment Transaction ID / UTR <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="transactionId"
                          required
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          placeholder="e.g. 429381920192 or UPI Ref"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none font-mono transition-all"
                        />
                        <span className="text-[11px] text-slate-500 block mt-1">
                          Mandatory: Enter UPI Ref No. / UTR from your subscription transfer.
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                        Residential Address
                      </label>
                      <textarea
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Residential address with PIN code"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      ></textarea>
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="agreeRules"
                          checked={formData.agreeRules}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                        />
                        <span className="text-xs text-slate-700 leading-relaxed">
                          I hereby apply to become a member of <strong>{associationInfo.fullName}</strong>. I declare that I am a permanent General Category employee of Canara Bank, and I agree to abide by the rules, bye-laws, and resolutions made by the Association from time to time.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <UserPlus className="w-5 h-5 text-amber-300" />
                      <span>{isSubmitting ? 'Processing & Submitting Application...' : 'Submit Membership Application'}</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* ========================================================
                   DIGITAL CONFIRMATION & ACKNOWLEDGMENT SLIP (WITH PHOTO)
                   ======================================================== */
                <div className="bg-white rounded-3xl border-2 border-blue-600 p-6 sm:p-8 shadow-xl" id="printableSlip">
                  {/* Official Header for Print & Display */}
                  <div className="flex items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
                    <div className="flex items-center gap-3">
                      <img src="/logo.jpeg" alt="Logo" className="w-14 h-14 rounded-full object-contain border border-slate-200 shrink-0" />
                      <div className="text-left">
                        <div className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                          CANARA BANK GENERAL CATEGORY STAFF WELFARE ASSOCIATION (REGD)
                        </div>
                        <div className="text-[11px] font-bold text-amber-600">
                          Regd. No. 99 of 2023 &bull; Societies Registration Act 2001 &bull; Whole of India
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Registered Office: Balkonda Hall, Uppari Peta, Nandyal - 518501, Andhra Pradesh
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-4 border-b border-slate-100">
                    <h3 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-wide">
                      Membership Application &amp; Acknowledgment Slip
                    </h3>
                    <div className="mt-2 inline-block px-4 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-mono font-bold text-xs sm:text-sm">
                      Application Ref No: {submittedData.referenceNumber}
                    </div>
                  </div>

                  {/* Details with Photo Layout */}
                  <div className="my-5 bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      {/* Left: Applicant Details */}
                      <div className="flex-1 space-y-2 text-xs sm:text-sm text-left w-full">
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Applicant Name:</span>
                          <span className="font-bold text-slate-900">{submittedData.fullName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Staff Roll No.:</span>
                          <span className="font-bold text-slate-900">{submittedData.staffId}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Cadre / Designation:</span>
                          <span className="font-bold text-slate-900">{submittedData.cadre}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Branch Name &amp; DP:</span>
                          <span className="font-bold text-slate-900">{submittedData.branchName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Circle Office / RO:</span>
                          <span className="font-bold text-slate-900">{submittedData.circleOffice}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Mobile &amp; Email:</span>
                          <span className="font-bold text-slate-900">{submittedData.mobile} | {submittedData.email}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Payment Mode:</span>
                          <span className="font-bold text-slate-900 capitalize">{submittedData.paymentMode}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-slate-200/60 pb-1.5">
                          <span className="text-slate-500 font-semibold">Transaction ID / UTR:</span>
                          <span className="font-bold text-blue-900 font-mono">{submittedData.transactionId}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-slate-500 font-semibold">Date of Application:</span>
                          <span className="font-bold text-slate-900">{submittedData.submissionDate}</span>
                        </div>
                      </div>

                      {/* Right: Attached Photo in Slip */}
                      <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-300 shadow-sm mx-auto sm:mx-0">
                        {formatPhotoUrl(submittedData.photoUrl) ? (
                          <img 
                            src={formatPhotoUrl(submittedData.photoUrl)} 
                            alt="Applicant" 
                            referrerPolicy="no-referrer"
                            className="w-24 h-28 object-cover rounded-lg border border-slate-200"
                          />
                        ) : (
                          <div className="w-24 h-28 bg-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-400 border border-slate-200 text-center p-2">
                            <User className="w-8 h-8 mb-1" />
                            <span className="text-[9px] uppercase font-bold">Photo Attached</span>
                          </div>
                        )}
                        <span className="text-[10px] font-bold text-slate-500 uppercase mt-1.5">Applicant Photo</span>
                      </div>
                    </div>
                  </div>

                  {/* Post-Registration Status Notice */}
                  <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 space-y-1 mb-5 text-left">
                    <div className="font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Next Step: Administrative Scrutiny &amp; ID Card Issuance</span>
                    </div>
                    <p className="leading-relaxed">
                      Your application and photo have been registered. Once approved by the Executive Committee in Google Sheets, your <strong>Official Member Photo ID Card</strong> can be downloaded anytime using your Staff Roll No. <strong>({submittedData.staffId})</strong> from the <em>"Check Status &amp; ID Card"</em> tab.
                    </p>
                  </div>

                  {/* Signatures block for printing */}
                  <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 text-xs text-slate-600 mb-5">
                    <div className="text-left pt-6">
                      <div className="border-t border-slate-400 w-36 pt-1 font-semibold text-slate-800">
                        Applicant's Signature
                      </div>
                    </div>
                    <div className="text-right pt-6">
                      <div className="border-t border-slate-400 w-48 ml-auto pt-1 font-semibold text-slate-800">
                        General Secretary / Treasurer
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (Hidden on Print) */}
                  <div className="flex flex-col sm:flex-row gap-3 no-print">
                    <button
                      onClick={handlePrint}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>Print / Save Slip as PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        setSearchStaffId(submittedData.staffId);
                        setActiveTab('status');
                        handleCheckStatus();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-amber-300" />
                      <span>Check ID Card Status</span>
                    </button>

                    <button
                      onClick={handleResetForm}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>New Application</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Offline Option Notice */}
              <div className="mt-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2">
                <span>Prefer submitting a physical form?</span>
                <a 
                  href="/docs/membership-form.pdf" 
                  download="CBGCSWA-Membership-Form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Printable Offline Membership Form (PDF)</span>
                </a>
              </div>
            </div>
          </>
        )}

        {/* ========================================================
            TAB 2: CHECK APPLICATION STATUS & DOWNLOAD MEMBER ID CARD
            ======================================================== */}
        {activeTab === 'status' && (
          <div className="max-w-3xl mx-auto">
            
            {/* PERMANENT TOP SEARCH BAR (ALWAYS ACCESSIBLE TO ANY MEMBER) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 no-print">
              <div className="text-center max-w-lg mx-auto mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Member Status &amp; ID Card Portal</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your Staff Roll Number / Employee ID to check approval status and print your official Member Identity Card.
                </p>
              </div>

              <form onSubmit={handleCheckStatus} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    value={searchStaffId}
                    onChange={(e) => setSearchStaffId(e.target.value)}
                    placeholder="Enter Staff Roll No. (e.g. 326598)"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-mono"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={searchLoading}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    {searchLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 text-amber-400" />
                        <span>Check Status</span>
                      </>
                    )}
                  </button>

                  {searchResult && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      title="Clear card and search new staff ID"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-3.5 py-3 rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>

              {searchError && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 max-w-lg mx-auto text-left">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{searchError}</span>
                </div>
              )}
            </div>

            {/* Status & ID Card Display Container */}
            {searchResult && (
              <div className="space-y-6">
                
                {/* CASE A: PENDING STATUS */}
                {searchResult.status?.toLowerCase().includes('pending') ? (
                  <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 pb-4 mb-5 border-b border-amber-100">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wide mb-0.5">
                          Status: Application Under Scrutiny
                        </div>
                        <h4 className="text-base font-bold text-slate-900">
                          Verification Pending with Executive Committee
                        </h4>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed text-left mb-6">
                      Dear <strong>{searchResult.fullName}</strong>, your membership application (Ref: <code>{searchResult.referenceNumber}</code>) submitted on <strong>{searchResult.submissionDate || 'Recent'}</strong> has been registered successfully. The General Secretary &amp; Executive Committee are currently verifying your credentials. Once marked as <strong>Approved</strong> in Google Sheets, your official Photo ID Card will be immediately unlocked here.
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs sm:text-sm text-left grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-500 font-semibold block">Applicant Name:</span>
                        <span className="font-bold text-slate-900">{searchResult.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">Staff Roll Number:</span>
                        <span className="font-bold text-slate-900 font-mono">{searchResult.staffId}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">Designation:</span>
                        <span className="font-bold text-slate-900">{searchResult.cadre}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">Branch / Office:</span>
                        <span className="font-bold text-slate-900">{searchResult.branchName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block">Transaction Ref / UTR:</span>
                        <span className="font-bold text-slate-900 font-mono">{searchResult.transactionId || 'Recorded'}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end no-print">
                      <button
                        onClick={handleClearSearch}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Done Viewing? Clear Screen</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ========================================================
                     CASE B: APPROVED STATUS -> OFFICIAL CBGCSWA PHOTO ID CARD
                     ======================================================== */
                  <div className="space-y-6">
                    {/* Success notification banner (Hidden on print) */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-emerald-900 uppercase tracking-wide">
                            Membership Status: Approved &amp; Active
                          </div>
                          <p className="text-xs text-emerald-700">
                            Official Canara Bank General Category Staff Welfare Association membership confirmed.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={handlePrint}
                          className="flex-1 sm:flex-initial bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print ID Card</span>
                        </button>
                        <button
                          onClick={handleClearSearch}
                          title="Clear screen for privacy"
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    {/* Photo update alert notification */}
                    {photoUpdateSuccess && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 flex items-center gap-2 no-print">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>Member photo updated successfully and attached to your Official ID Card!</span>
                      </div>
                    )}

                    {/* ====================================================
                        OFFICIAL CBGCSWA WALLET-SIZE IDENTITY CARD
                        (Targeted by #printableIdCard for 100% landscape card print)
                        ==================================================== */}
                    <div className="flex flex-col items-center">
                      <div 
                        id="printableIdCard"
                        className="w-full max-w-[540px] min-h-[340px] bg-gradient-to-br from-[#0B2545] via-[#103463] to-[#0B2545] text-white rounded-2xl border-2 border-amber-400/90 shadow-2xl p-4 sm:p-5 relative select-none flex flex-col justify-between"
                      >
                        {/* Background Watermark Pattern */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center overflow-hidden rounded-2xl">
                          <img src="/logo.jpeg" alt="Watermark" className="w-64 h-64 object-contain" />
                        </div>

                        {/* Top Block: Header & Ribbon */}
                        <div className="relative z-10">
                          {/* Top Header */}
                          <div className="flex items-center gap-2.5 pb-2 border-b border-amber-400/40">
                            <img 
                              src="/logo.jpeg" 
                              alt="Logo" 
                              className="w-11 h-11 rounded-full object-contain bg-white p-0.5 border-2 border-amber-400 shrink-0 shadow-md"
                            />
                            <div className="flex-1 text-left">
                              <div className="text-[11px] sm:text-[12.5px] font-black tracking-wide text-white uppercase leading-tight drop-shadow-sm">
                                CANARA BANK GENERAL CATEGORY STAFF WELFARE ASSOCIATION (REGD)
                              </div>
                              <div className="text-[8.5px] sm:text-[9.5px] font-bold text-amber-300 mt-0.5">
                                Regd. No. 99 of 2023 &bull; AP Societies Act 2001 &bull; Whole of India
                              </div>
                            </div>
                          </div>

                          {/* Gold Ribbon Label & Member Reference */}
                          <div className="my-2 flex items-center justify-between gap-2">
                            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-[8.5px] sm:text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow whitespace-nowrap">
                              OFFICIAL MEMBER IDENTITY CARD
                            </span>
                            <span className="text-[8.5px] font-mono font-bold text-amber-200 bg-blue-950/60 px-2 py-0.5 rounded border border-amber-400/30 whitespace-nowrap">
                              {searchResult.referenceNumber || 'CBGCSWA-REG'}
                            </span>
                          </div>
                        </div>

                        {/* Middle Block: Photo on Left, Details on Right */}
                        <div className="relative z-10 flex items-start gap-3.5 my-1 text-left">
                          {/* Passport Photo Box */}
                          <div className="shrink-0 flex flex-col items-center">
                            <div className="w-22 h-26 sm:w-24 sm:h-28 bg-slate-100 rounded-lg border-2 border-amber-400 overflow-hidden shadow-md flex items-center justify-center relative">
                              {formatPhotoUrl(searchResult.photoUrl) ? (
                                <img 
                                  src={formatPhotoUrl(searchResult.photoUrl)} 
                                  alt={searchResult.fullName} 
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    if (!e.target.dataset.tried) {
                                      e.target.dataset.tried = 'true';
                                      const driveMatch = (searchResult.photoUrl || '').match(/[-\w]{25,}/);
                                      if (driveMatch) {
                                        e.target.src = `https://drive.google.com/thumbnail?id=${driveMatch[0]}&sz=w600`;
                                        return;
                                      }
                                    }
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                                  <User className="w-9 h-9 text-slate-400 mb-1" />
                                  <span className="text-[8px] text-slate-500 font-bold uppercase leading-tight">No Photo Attached</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-1 px-2 py-0.5 bg-emerald-600 text-white text-[7.5px] sm:text-[8.5px] font-extrabold uppercase rounded-full tracking-wider shadow">
                              ACTIVE MEMBER
                            </div>
                          </div>

                          {/* Member Information Details */}
                          <div className="flex-1 space-y-0.5 text-xs">
                            <div className="border-b border-white/10 pb-0.5">
                              <span className="text-[8.5px] font-bold text-amber-300 uppercase tracking-wider block">Member Name</span>
                              <span className="text-sm sm:text-[15px] font-black text-white uppercase tracking-wide leading-tight block">
                                {searchResult.fullName}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 pt-0.5 text-[9.5px] sm:text-[10.5px]">
                              <div>
                                <span className="text-amber-200/80 font-medium block text-[8.5px]">Staff Roll No:</span>
                                <span className="font-bold text-white font-mono">{searchResult.staffId}</span>
                              </div>
                              <div>
                                <span className="text-amber-200/80 font-medium block text-[8.5px]">Cadre:</span>
                                <span className="font-bold text-white truncate block">{searchResult.cadre}</span>
                              </div>
                              <div className="col-span-2">
                                <span className="text-amber-200/80 font-medium block text-[8.5px]">Branch / Office:</span>
                                <span className="font-bold text-white truncate block">{searchResult.branchName}</span>
                              </div>
                              <div>
                                <span className="text-amber-200/80 font-medium block text-[8.5px]">Circle / RO:</span>
                                <span className="font-bold text-white truncate block">{searchResult.circleOffice}</span>
                              </div>
                              <div>
                                <span className="text-amber-200/80 font-medium block text-[8.5px]">Validity:</span>
                                <span className="font-bold text-emerald-300 block">Permanent</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Block: Motto & Authorized Signatory (Always Pinned Inside) */}
                        <div className="relative z-10 pt-2 mt-2 border-t border-amber-400/40 flex items-center justify-between text-[9px]">
                          <div>
                            <span className="font-extrabold text-amber-400 tracking-wider uppercase block text-[7.5px] leading-tight">
                              Motto:
                            </span>
                            <span className="italic font-bold text-slate-100 text-[9.5px] sm:text-[10px] block leading-tight">
                              &ldquo;ALL FOR ONE, ONE FOR ALL&rdquo;
                            </span>
                          </div>

                          {/* Authorized Signatory Block */}
                          <div className="text-right">
                            <div className="font-cursive text-amber-200 text-[10.5px] leading-tight font-serif italic block">
                              Y. Jagadeeswara Reddy
                            </div>
                            <div className="text-[7.5px] font-bold text-amber-400 uppercase tracking-tight block">
                              General Secretary
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dotted Cut-Out Guide (Only visible when printed) */}
                      <div className="print-cut-guide">
                        ✂ Cut along the outer border for standard wallet card laminating
                      </div>
                    </div>

                    {/* Action Buttons for ID Card */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto no-print">
                      {/* Optional Photo Attachment (for existing records whose photo was missing) */}
                      <input 
                        type="file"
                        ref={cardPhotoInputRef}
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleCardPhotoUpload}
                        className="hidden"
                        id="cardPhotoUploadTrigger"
                      />
                      <label
                        htmlFor="cardPhotoUploadTrigger"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        {updatingPhoto ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                            <span>Saving Photo...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-4 h-4 text-amber-300" />
                            <span>{formatPhotoUrl(searchResult.photoUrl) ? 'Change Photo' : 'Upload Member Photo'}</span>
                          </>
                        )}
                      </label>

                      <button
                        onClick={handlePrint}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        <Printer className="w-4 h-4 text-amber-400" />
                        <span>Print / Save ID Card (PDF)</span>
                      </button>

                      <button
                        onClick={handleClearSearch}
                        className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors cursor-pointer"
                      >
                        <Lock className="w-4 h-4 text-slate-500" />
                        <span>Close Card</span>
                      </button>
                    </div>

                    {/* Printing Instructions for Card */}
                    <p className="text-xs text-slate-500 max-w-md mx-auto no-print">
                      Tip: When printing, select <strong>"Save as PDF"</strong> or your color printer, and ensure <strong>"Background graphics"</strong> is checked for vivid card colors.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Explanatory Help Guide when no search has been performed yet */}
            {!searchResult && !searchError && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-left space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>How to get your Official Photo ID Card</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-blue-900 block mb-1">Step 1: Apply Online</span>
                    Attach your passport photo and submit the enrolment form in the New Registration tab.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-amber-800 block mb-1">Step 2: Scrutiny</span>
                    The Secretariat verifies your details in the Google Sheet and marks your application as Approved.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-emerald-800 block mb-1">Step 3: Instant ID Card</span>
                    Enter your Staff Roll Number here anytime to download or print your high-resolution wallet ID card.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
