import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle2, Building2, Clock, Copy, Check, CreditCard, MessageCircle, QrCode, Download } from 'lucide-react';
import { associationInfo } from '../data/associationData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    staffNo: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Helpdesk &amp; Communications
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            Get in Touch With Association Secretariat
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have a question regarding membership, service rights, or transfer/promotion policies? Reach out to our leadership directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-700" />
                <span>Registered Central Office</span>
              </h3>
              
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">{associationInfo.fullName}</div>
                  <div>{associationInfo.address.doorNo}, {associationInfo.address.landmark}</div>
                  <div>{associationInfo.address.city} - {associationInfo.address.pincode}</div>
                  <div>{associationInfo.address.district}, {associationInfo.address.state}, {associationInfo.address.country}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Direct Contact Channels</h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Official Email</div>
                    <a href={`mailto:${associationInfo.email}`} className="font-bold text-blue-700 hover:underline">
                      {associationInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">General Secretary / Helpline</div>
                    <a href={`tel:${associationInfo.phone}`} className="font-bold text-slate-800 hover:underline">
                      {associationInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Official WhatsApp Helpdesk</div>
                    <a 
                      href={`https://wa.me/918977128003`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold text-emerald-700 hover:underline flex items-center gap-1.5"
                    >
                      <span>+91 8977128003</span>
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Chat Now</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Availability</div>
                    <span className="font-semibold text-slate-700">Bank Working Hours &amp; Weekends</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Bank Account & QR Code Details */}
            <div className="bg-emerald-50/90 border-2 border-emerald-500/40 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    CB
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase text-emerald-950 tracking-wider block">
                      Association Bank Account &amp; QR
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      Canara Bank Official Remittance
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  &#8377;10 Fee Waived
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-800 block mb-0.5">
                  Account Name:
                </span>
                <div className="text-sm font-extrabold text-slate-900">
                  {associationInfo.bankAccount.shortAccountName}
                </div>
                <div className="text-xs text-slate-600">
                  (Canara Bank General Category Staff Welfare Association)
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase text-emerald-800">
                    Account Number:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator?.clipboard?.writeText(associationInfo.bankAccount?.accountNumber || '110112092968');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2500);
                    }}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Copy No.</span>
                      </>
                    )}
                  </button>
                </div>
                <div 
                  onClick={() => {
                    navigator?.clipboard?.writeText(associationInfo.bankAccount?.accountNumber || '110112092968');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  }}
                  title="Click to copy account number"
                  className="bg-[#0b5345] hover:bg-[#084237] text-white font-mono font-black text-lg py-2 px-3 rounded-xl text-center tracking-wider shadow-inner cursor-pointer transition-colors"
                >
                  {associationInfo.bankAccount.accountNumber}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase text-emerald-800">
                    UPI ID:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator?.clipboard?.writeText(associationInfo.bankAccount?.upiId || '110112092968@canara');
                      setCopiedUpi(true);
                      setTimeout(() => setCopiedUpi(false), 2500);
                    }}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded transition-colors"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Copy UPI</span>
                      </>
                    )}
                  </button>
                </div>
                <div 
                  onClick={() => {
                    navigator?.clipboard?.writeText(associationInfo.bankAccount?.upiId || '110112092968@canara');
                    setCopiedUpi(true);
                    setTimeout(() => setCopiedUpi(false), 2500);
                  }}
                  title="Click to copy UPI ID"
                  className="bg-emerald-900/90 text-amber-300 font-mono font-bold text-sm py-1.5 px-3 rounded-lg text-center tracking-wide shadow-inner cursor-pointer"
                >
                  {associationInfo.bankAccount.upiId || '110112092968@canara'}
                </div>
              </div>

              {/* Bank QR Code Box */}
              <div className="pt-2 text-center bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
                <div className="text-[11px] font-bold text-emerald-900 flex items-center justify-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Scan &amp; Pay (All UPI Apps)</span>
                </div>
                <img 
                  src="/bank-qr-code.jpeg" 
                  alt="Canara Bank QR" 
                  className="w-32 h-auto mx-auto rounded-lg border border-slate-200 shadow-sm"
                />
                <a
                  href="/bank-qr-code.jpeg"
                  download="Canara-Bank-CBGCSWA-QR.jpeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Bank QR</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Query & Grievance Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Member Query &amp; Grievance Redressal Box
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Submit your inquiry directly to the Executive Committee. Your communication will be treated with confidentiality.
            </p>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Staff Roll No. *</label>
                    <input
                      type="text"
                      name="staffNo"
                      required
                      value={formData.staffNo}
                      onChange={handleChange}
                      placeholder="e.g. 82302"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Nature of Inquiry *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Membership Verification / Transfer Concern / Check-Off status"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide specifics of your query or grievance..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Send Message to General Secretary</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message Received Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, Comrade. Your grievance/query has been routed to the Executive Secretariat. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-blue-700 font-bold hover:underline pt-2"
                >
                  Send another query
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
