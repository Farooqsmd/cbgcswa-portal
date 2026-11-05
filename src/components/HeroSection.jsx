import React from 'react';
import { Shield, FileText, UserPlus, ArrowRight, Award } from 'lucide-react';
import { associationInfo } from '../data/associationData';

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-14 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Regd. No. {associationInfo.registrationNo} &bull; Societies Registration Act 2001</span>
          </div>

          <div className="flex items-center justify-center text-amber-400 font-black tracking-widest text-xs sm:text-sm uppercase mb-3">
            <span>&ldquo;{associationInfo.motto.toUpperCase()}&rdquo;</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight uppercase mb-6">
            CANARA BANK GENERAL CATEGORY <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
              STAFF WELFARE ASSOCIATION (REGD)
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl mx-auto">
            A lawful, democratic, and voluntary all-India body safeguarding service rights, ensuring equality in career progression, transparent transfers, and comprehensive family welfare for Canara Bank General Category employees across the nation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#membership"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-5 h-5" />
              <span>Enroll as Member</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#objectives"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 transition-all"
            >
              <FileText className="w-5 h-5 text-blue-400" />
              <span>Constitution &amp; Aims</span>
            </a>

            <a
              href="#advocacy"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-950/70 hover:bg-blue-900/70 text-blue-200 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-blue-800 transition-all"
            >
              <Shield className="w-5 h-5 text-amber-400" />
              <span>Check-Off Campaign</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 sm:p-4 rounded-xl">
              <div className="text-amber-400 font-black text-lg sm:text-xl mb-1">03/04/2023</div>
              <div className="text-xs text-slate-300 font-medium">Formed &amp; Registered</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 sm:p-4 rounded-xl">
              <div className="text-amber-400 font-black text-lg sm:text-xl mb-1">Whole of India</div>
              <div className="text-xs text-slate-300 font-medium">Statutory Jurisdiction</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 sm:p-4 rounded-xl">
              <div className="text-amber-400 font-black text-lg sm:text-xl mb-1">Articles 14 &amp; 16</div>
              <div className="text-xs text-slate-300 font-medium">Equal Opportunity Basis</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 sm:p-4 rounded-xl">
              <div className="text-amber-400 font-black text-lg sm:text-xl mb-1">&#8377;108 / Month</div>
              <div className="text-xs text-slate-300 font-medium">Mutual Welfare Pool</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
