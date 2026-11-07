import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCheck, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const phoneNumber = '918977128003';
  const displayPhone = '+91 8977128003';

  const defaultTemplates = [
    { label: '💳 Payment Screenshot / UTR', text: 'Namaste CBGCSWA, I have completed my membership fee payment and want to submit my payment UTR/screenshot for verification.' },
    { label: '📝 Membership Enrolment', text: 'Namaste, I am a Canara Bank employee and would like assistance with joining CBGCSWA.' },
    { label: '🪪 Photo ID Card Status', text: 'Namaste, I would like to check the approval status of my CBGCSWA Member ID Card.' },
    { label: '⚖️ General Query', text: 'Namaste CBGCSWA Secretariat, I have an inquiry regarding association activities.' }
  ];

  const handleOpenWhatsApp = (messageText) => {
    const textToSend = encodeURIComponent(messageText || customMsg || 'Namaste CBGCSWA, I have an inquiry regarding the association.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${textToSend}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="WhatsApp Support Helpdesk" className="no-print">
      {/* Floating Trigger Button (Bottom-Left) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-5 z-50 group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-600/40 border-2 border-white transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Chat with CBGCSWA on WhatsApp"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-black shadow-inner">
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-700 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-wide flex items-center gap-1 text-white">
              <span>WhatsApp Helpdesk</span>
            </div>
            <div className="text-[10px] text-emerald-100 font-medium">
              {displayPhone} • Online
            </div>
          </div>
        </button>
      )}

      {/* Floating WhatsApp Card Modal */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[92vw] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between border-b border-emerald-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white text-emerald-600 flex items-center justify-center font-black shadow-md">
                  <MessageCircle className="w-6 h-6 fill-emerald-600 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-emerald-800" />
              </div>
              <div>
                <div className="text-sm font-black flex items-center gap-1.5 text-white">
                  <span>CBGCSWA WhatsApp</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-white/20 text-white border border-white/30">
                    Official
                  </span>
                </div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>{displayPhone}</span>
                  <span>•</span>
                  <span className="text-emerald-200">Online Support</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              title="Close WhatsApp window"
              className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Notice */}
          <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-1.5 text-[11px] text-emerald-900 flex items-center justify-between shrink-0 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Direct Coordinator Helpline
            </span>
            <span className="text-emerald-700 font-bold">Fast Response</span>
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-4 bg-slate-50/70 text-xs sm:text-sm">
            {/* WhatsApp Chat Bubble */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-100">
                <span className="font-bold text-emerald-800">Canara Bank Staff Welfare Support</span>
                <span>Just now</span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">
                Namaste! Welcome to <strong>CBGCSWA WhatsApp Helpdesk</strong>.
                <br /><br />
                You can chat directly with our representative at <strong className="font-mono text-emerald-700">{displayPhone}</strong> for:
              </p>
              <ul className="text-slate-600 text-xs list-disc list-inside space-y-1 pl-1">
                <li>Sending membership payment UTR / screenshot</li>
                <li>Instant membership &amp; enrolment guidance</li>
                <li>Digital Photo ID card verification</li>
              </ul>
            </div>

            {/* Quick Starter Templates */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Choose a query to send:
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {defaultTemplates.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenWhatsApp(t.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 text-xs font-medium transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                  >
                    <span>{t.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message Field */}
            <div className="space-y-2 pt-1">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleOpenWhatsApp(customMsg);
                  }}
                  placeholder="Or type a custom message..."
                  className="w-full bg-white border border-slate-300 rounded-xl pl-3 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                />
              </div>

              {/* Main Launch Button */}
              <button
                onClick={() => handleOpenWhatsApp(customMsg)}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp ({displayPhone})</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="bg-slate-100 px-4 py-2 text-[10px] text-slate-500 text-center border-t border-slate-200">
            Opens WhatsApp Web or mobile app directly.
          </div>
        </div>
      )}
    </aside>
  );
}
