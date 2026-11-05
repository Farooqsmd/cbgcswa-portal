import React from 'react';
import { Scale, CheckCircle2, AlertCircle, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { representationsTimeline } from '../data/associationData';

export default function AdvocacySection() {
  return (
    <section id="advocacy" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Legal Advocacy &amp; Policy Matters
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            Advocating for Parity &amp; The Check-Off Facility
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The Association is actively pursuing policy clarity and non-discriminatory treatment from the Ministry of Finance, Department of Financial Services (DFS), and Canara Bank Top Management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-700" />
              <span>The Constitutional Principle of Equality</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Check-off facility is a ministerial payroll deduction mechanism enabling employees to voluntarily contribute their monthly membership subscriptions directly through salary deduction without any financial cost or expenditure to the Bank.
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>No Statutory Prohibition:</strong> Through RTI Ref No. DOFSR/R/E/25/00584, the DFS has clarified that no circular prohibits check-off facility to General Category Welfare Associations.
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Supreme Court Precedents:</strong> Landmark judgements (<em>E.P. Royappa, Maneka Gandhi, Anwar Ali Sarkar</em>) establish that state actions must satisfy Articles 14 and 16 &mdash; arbitrariness is the very negation of equality.
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Precedent in State PSUs:</strong> The Government of Andhra Pradesh recognized and extended Check-off to Electricity OC Employees Welfare Association in AP SPDCL (Reg No. 1088/2008).
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Official Representation to the Apex Authorities</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The Association has submitted comprehensive representations (Ref: <strong>GS/CBGCSWA/LTR/1/2026</strong>) to:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-200 pl-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>The Prime Minister&apos;s Office, South Block, New Delhi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>The Finance Minister, Kartavya Bhawan-I, New Delhi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>The Secretary, Department of Financial Services (DFS), Ministry of Finance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>The Under Secretary (Welfare Section), DFS, New Delhi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>The Managing Director &amp; CEO, Canara Bank, Head Office, Bangalore</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Demanding non-discriminatory treatment</span>
              <a href="#downloads" className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                <span>View Full Letter</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Timeline of Key Milestones */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span>
            <span>Chronology of Directives &amp; Association Milestones</span>
          </h3>

          <div className="space-y-6 border-l-2 border-blue-200 ml-3 pl-5">
            {representationsTimeline.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-blue-700 border-2 border-white"></div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                    {item.date}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.authority}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
