import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  ExternalLink, 
  CreditCard, 
  UserPlus, 
  FileText, 
  Phone, 
  ChevronRight, 
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { associationInfo, officeBearers } from '../data/associationData';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Namaste & Warm Greetings! I am **CBGCSWA Sahayak**, the automated AI assistant for Canara Bank General Category Staff Welfare Association.\n\nI can help you with membership enrolment, official bank account details, fee remittance, checking Photo ID card status, and association circulars. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '🏦 Bank Account Details', query: 'Show association bank account details for payment' },
        { label: '📝 How to Enroll as Member', query: 'How to join and enroll in the association?' },
        { label: '🪪 Check ID Card Status', query: 'How to check my ID card approval status?' },
        { label: '📜 Bye-Laws & Reg. No.', query: 'What is the registration number and bye-laws?' },
        { label: '⚖️ Check-Off Facility Update', query: 'What is the status of check-off facility?' },
        { label: '📞 Contact Secretariat', query: 'How can I contact General Secretary?' }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleCopyAccount = (accNo) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(accNo || associationInfo.bankAccount.accountNumber);
      setCopiedAcc(true);
      setTimeout(() => setCopiedAcc(false), 2500);
    }
  };

  const handleQuickAction = (query) => {
    processUserMessage(query);
  };

  const navigateToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Keep chat open or minimize on mobile
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    }
  };

  // Comprehensive, institutional knowledge engine grounded in CBGCSWA official records
  const generateKnowledgeResponse = (userText) => {
    const q = userText.toLowerCase().trim();

    // 1. Bank Account & Payment Details
    if (
      q.includes('bank') || 
      q.includes('account') || 
      q.includes('acc') || 
      q.includes('a/c') || 
      q.includes('payment') || 
      q.includes('fee') || 
      q.includes('how much') || 
      q.includes('upi') || 
      q.includes('qr') || 
      q.includes('neft') || 
      q.includes('transfer') || 
      q.includes('remittance') ||
      q.includes('110112092968')
    ) {
      return {
        text: `Here are the official **Canara Bank Account Details** for membership subscription remittance:\n\n` +
              `• **Account Name:** CBGCSWA (Canara Bank General Category Staff Welfare Association)\n` +
              `• **Account Number:** **${associationInfo.bankAccount.accountNumber}**\n` +
              `• **Bank:** Canara Bank\n` +
              `• **Annual Fee:** ₹1,296 (Welfare Pool) + ₹10 (One-time Admission) = **₹1,306 Total**\n\n` +
              `**How to Pay:**\n` +
              `1. Transfer ₹1,306 using Canara Bank NetBanking, CANDI Mobile App, NEFT, IMPS, or any UPI App.\n` +
              `2. Note down your **12-digit UTR / UPI Reference Number**.\n` +
              `3. Enter this UTR in the mandatory Transaction ID field during online enrolment.`,
        action: { label: 'Go to Online Enrolment Form', section: 'membership' },
        showAccountPill: true
      };
    }

    // 2. Enrolment & Eligibility
    if (
      q.includes('enroll') || 
      q.includes('enrol') || 
      q.includes('join') || 
      q.includes('register') || 
      q.includes('form') || 
      q.includes('eligib') || 
      q.includes('who can') || 
      q.includes('apply') ||
      q.includes('how to join')
    ) {
      return {
        text: `**Eligibility & Registration Process:**\n\n` +
              `• **Who can join:** Every permanent General Category employee of Canara Bank across India (Officers Scale I to V+, Clerks/Special Assistants, and Sub-staff/Peons/Daftaries).\n\n` +
              `**3 Quick Steps to Enroll:**\n` +
              `1. **Remit Fee:** Transfer ₹1,306 to Canara Bank A/c **${associationInfo.bankAccount.accountNumber}**.\n` +
              `2. **Fill Details:** Enter your Staff ID, Name, Cadre, Branch, DP Code, Circle/RO, and upload your passport photo.\n` +
              `3. **Submit with UTR:** Enter your payment Transaction ID / UTR and submit to receive your instant printable Acknowledgment Slip!`,
        action: { label: 'Open Enrolment Form', section: 'membership' }
      };
    }

    // 3. ID Card & Status Check
    if (
      q.includes('id card') || 
      q.includes('card') || 
      q.includes('status') || 
      q.includes('approval') || 
      q.includes('approve') || 
      q.includes('pending') || 
      q.includes('print id') || 
      q.includes('download id')
    ) {
      return {
        text: `**Member Identity Card & Approval Workflow:**\n\n` +
              `• After submitting your application, your credentials and subscription payment are verified by the Central Secretariat in Google Sheets.\n` +
              `• Once marked as **Approved**, your official wallet-sized **CBGCSWA Photo Member ID Card** unlocks instantly!\n` +
              `• **How to check & print:** Click on the *"Check Status & Member ID Card"* tab on the portal and enter your Canara Bank **Staff Roll Number**.\n` +
              `• Supports 1-click landscape badge printing with official signature and association seal.`,
        action: { label: 'Check Status & Print ID Card', section: 'membership' }
      };
    }

    // 4. Check-Off Facility & DFS Representations
    if (
      q.includes('check off') || 
      q.includes('check-off') || 
      q.includes('checkoff') || 
      q.includes('salary deduction') || 
      q.includes('dfs') || 
      q.includes('ministry') || 
      q.includes('rti') || 
      q.includes('representation')
    ) {
      return {
        text: `**Check-Off Facility & Statutory Advocacy:**\n\n` +
              `• **Ministry of Finance (1988 Directive 15/13/84-IR):** PSBs were advised to extend check-off uniformly to all registered welfare bodies.\n` +
              `• **DFS HRMS Mandate (2019 Directive 4/1/4/2019-IR):** Directed PSBs to introduce online HRMS module for recording membership deduction mandates.\n` +
              `• **RTI Clarification (2025):** The Ministry of Finance (DFS) confirmed in writing that NO central circular exists prohibiting check-off to General Category associations.\n` +
              `• **Apex Representation (2026):** Memorandum submitted to PMO, Hon'ble Finance Minister, and Canara Bank MD/CEO seeking constitutional parity under Articles 14 & 16.`,
        action: { label: 'View Circulars & Timeline', section: 'advocacy' }
      };
    }

    // 5. Bye-Laws, Registration & Constitution
    if (
      q.includes('byelaw') || 
      q.includes('bye-law') || 
      q.includes('bye law') || 
      q.includes('reg') || 
      q.includes('constitution') || 
      q.includes('society') || 
      q.includes('legal') || 
      q.includes('rule') || 
      q.includes('99 of 2023') ||
      q.includes('motto')
    ) {
      return {
        text: `**Constitutional & Statutory Framework:**\n\n` +
              `• **Registered Name:** CANARA BANK GENERAL CATEGORY STAFF WELFARE ASSOCIATION (REGD)\n` +
              `• **Registration No:** **99 of 2023** (Registered on 03/04/2023)\n` +
              `• **Governing Law:** AP Societies Registration Act 2001 (A.P. Act XXXV of 2001)\n` +
              `• **Jurisdiction:** Andhra Pradesh extended to the **Whole of India**\n` +
              `• **Association Motto:** *"All for one, one for all"*\n` +
              `• **Key Aims:** Safeguarding service conditions, fair promotion policies, educational aid for children, and legal counseling for members.`,
        action: { label: 'View Document Repository', section: 'downloads' }
      };
    }

    // 6. Leadership & Office Bearers
    if (
      q.includes('president') || 
      q.includes('secretary') || 
      q.includes('general secretary') || 
      q.includes('treasurer') || 
      q.includes('leader') || 
      q.includes('office bearer') || 
      q.includes('committee') || 
      q.includes('jagadeeswara') || 
      q.includes('nagi reddy')
    ) {
      return {
        text: `**Executive Committee of CBGCSWA:**\n\n` +
              `• **President:** Shri A.V. Nagi Reddy\n` +
              `• **Vice President:** Shri Shaik Noorahamed\n` +
              `• **General Secretary:** Shri Yama Jagadeeswara Reddy (Senior Manager, Canara Bank, Staff Roll No: 82302)\n` +
              `• **Joint Secretary:** Shri Singathala Guru Alark Reddy\n` +
              `• **Treasurer:** Shri Doma Venkata Sudhakar\n` +
              `• **Executive Members:** Shri M. Manideep, Shri U. Venkateswarlu, Shri P. Imran Khan, Shri G. Krishna Raghavendra.`,
        action: { label: 'View Leadership Profiles', section: 'leadership' }
      };
    }

    // 7. Contact & Central Secretariat
    if (
      q.includes('contact') || 
      q.includes('phone') || 
      q.includes('mobile') || 
      q.includes('email') || 
      q.includes('address') || 
      q.includes('office') || 
      q.includes('secretariat') || 
      q.includes('nandyal') || 
      q.includes('helpdesk')
    ) {
      return {
        text: `**Central Secretariat Contact Channels:**\n\n` +
              `• **Registered Office:** ${associationInfo.address.doorNo}, ${associationInfo.address.landmark}, ${associationInfo.address.city} - ${associationInfo.address.pincode}, ${associationInfo.address.state}, India.\n` +
              `• **Official Email:** ${associationInfo.email}\n` +
              `• **Helpline / Phone:** ${associationInfo.phone}\n` +
              `• **Availability:** Bank working hours and weekends.`,
        action: { label: 'Contact Secretariat', section: 'contact' }
      };
    }

    // 8. Individual Disciplinary / Legal Advice Guardrail
    if (
      q.includes('charge sheet') || 
      q.includes('chargesheet') || 
      q.includes('disciplinary') || 
      q.includes('enquiry') || 
      q.includes('suspension') || 
      q.includes('court') || 
      q.includes('advocate') || 
      q.includes('punishment') || 
      q.includes('grievance')
    ) {
      return {
        text: `**Confidential Member Defense & Counsel:**\n\n` +
              `The Association actively provides administrative counsel and legal assistance to General Category employees facing service-related issues.\n\n` +
              `⚠️ **Personal Case Protocol:** Individual disciplinary or judicial inquiries require confidential file review. Please do not share sensitive documents in chat.\n\n` +
              `Please communicate directly with General Secretary **Shri Y. Jagadeeswara Reddy** at **cbgcswa@gmail.com** or call **${associationInfo.phone}** for personal assistance.`,
        action: { label: 'Submit Confidential Query', section: 'contact' }
      };
    }

    // 9. Offline Form / Physical Application
    if (
      q.includes('offline') || 
      q.includes('physical') || 
      q.includes('print form') || 
      q.includes('paper')
    ) {
      return {
        text: `**Offline Membership Submission:**\n\n` +
              `If you prefer submitting a physical application instead of the online form, you can download our standard 2-page printable membership form (PDF). Fill it out, attach your photograph, and send it to the Central Secretariat or your regional representative.`,
        action: { label: 'Go to Downloads Repository', section: 'downloads' }
      };
    }

    // Default Fallback
    return {
      text: `I understand you are asking about *"userText"*. \n\n` +
            `As the official **CBGCSWA Welfare Assistant**, I can assist you with:\n` +
            `1. **Membership Enrolment & Fee Payment** (₹1,306 to A/c ${associationInfo.bankAccount.accountNumber})\n` +
            `2. **Photo ID Card Issuance & Approval Status**\n` +
            `3. **Check-Off Parity with Ministry of Finance & DFS**\n` +
            `4. **Association Bye-Laws & Reg. No. 99 of 2023**\n` +
            `5. **Reaching Central Secretariat Leadership**\n\n` +
            `Please tap one of the quick options below or describe what you need!`,
      quickActions: [
        { label: '🏦 Bank Account Details', query: 'Show association bank account details for payment' },
        { label: '📝 How to Enroll as Member', query: 'How to join and enroll in the association?' },
        { label: '🪪 Check ID Card Status', query: 'How to check my ID card approval status?' },
        { label: '📞 Contact Secretariat', query: 'How can I contact General Secretary?' }
      ]
    };
  };

  const processUserMessage = (userText) => {
    if (!userText || !userText.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateKnowledgeResponse(userText);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: resp.action,
        showAccountPill: resp.showAccountPill,
        quickActions: resp.quickActions
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processUserMessage(inputMessage);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Chat reset. Welcome back to **CBGCSWA Sahayak**! How can I assist you right now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '🏦 Bank Account Details', query: 'Show association bank account details for payment' },
          { label: '📝 How to Enroll as Member', query: 'How to join and enroll in the association?' },
          { label: '🪪 Check ID Card Status', query: 'How to check my ID card approval status?' },
          { label: '📞 Contact Secretariat', query: 'How can I contact General Secretary?' }
        ]
      }
    ]);
  };

  return (
    <div className="no-print">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 group flex items-center gap-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl hover:shadow-blue-900/40 border-2 border-amber-400 transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open CBGCSWA AI Assistant"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-inner">
              <Bot className="w-5 h-5 text-blue-950" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-blue-950 animate-pulse"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-wide flex items-center gap-1 text-white">
              <span>CBGCSWA Sahayak</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <div className="text-[10px] text-amber-200 font-medium">Ask Portal AI &bull; 24/7</div>
          </div>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[85vh] sm:h-[580px] max-h-[700px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white p-4 flex items-center justify-between border-b border-blue-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-md">
                  <Bot className="w-5 h-5 text-blue-950" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-900"></span>
              </div>
              <div>
                <div className="text-sm font-black flex items-center gap-1.5 text-white">
                  <span>CBGCSWA Sahayak</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    AI Assistant
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Canara Bank General Category Staff Welfare
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Notice Pill in Chat Header */}
          <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 text-[11px] text-amber-900 flex items-center justify-between shrink-0 font-medium">
            <span className="truncate">Regd. No. 99 of 2023 &bull; Whole of India</span>
            <span className="text-blue-700 font-bold hover:underline cursor-pointer ml-2 shrink-0" onClick={() => navigateToSection('membership')}>
              A/c: 110112092968
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-900 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                  }`}
                >
                  {/* Message formatted with markdown bold and bullet lines */}
                  <div className="whitespace-pre-wrap space-y-1.5">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph.split('**').map((chunk, cIdx) =>
                          cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold">{chunk}</strong> : chunk
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Optional Bank Account Copy Box inside Chat Bubble */}
                  {msg.showAccountPill && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-emerald-950 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span>Canara Bank A/c No:</span>
                        <button
                          onClick={() => handleCopyAccount(associationInfo.bankAccount.accountNumber)}
                          className="bg-emerald-200 hover:bg-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-900 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedAcc ? <Check className="w-3 h-3 text-emerald-800" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedAcc ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="font-mono font-black text-sm text-[#0b5345]">
                        {associationInfo.bankAccount.accountNumber}
                      </div>
                      <div className="text-[10px] text-emerald-700 italic">
                        {associationInfo.bankAccount.accountName}
                      </div>
                    </div>
                  )}

                  {/* Section Navigation Link Button */}
                  {msg.action && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => navigateToSection(msg.action.section)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Action Suggestion Chips */}
                {msg.quickActions && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.quickActions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(qa.query)}
                        className="text-[11px] font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 hover:border-blue-300 px-2.5 py-1 rounded-full transition-all shadow-2xs hover:shadow-xs cursor-pointer text-left"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-white w-fit px-3 py-2 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                </div>
                <span>Sahayak is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about CBGCSWA membership, fees, ID card..."
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send query"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </form>

          {/* Footer Subtext */}
          <div className="px-3 py-1 bg-slate-100 text-[10px] text-slate-500 text-center border-t border-slate-200/60 flex items-center justify-between">
            <span>Official CBGCSWA Assistant</span>
            <span className="font-semibold text-slate-600">All for one, one for all</span>
          </div>

        </div>
      )}
    </div>
  );
}
