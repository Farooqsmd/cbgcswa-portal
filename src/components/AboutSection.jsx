import React from 'react';
import { Scale, FileCheck2, HeartHandshake, ShieldCheck, Award, BookOpen } from 'lucide-react';
import { associationInfo } from '../data/associationData';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            About Our Organization
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            A Duly Registered, Non-Political Welfare Body for General Category Staff
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Formed on 03/04/2023 by permanent Canara Bank employees, the association functions democratically under the law to safeguard rights, foster mutual welfare, and maintain constructive dialogue with management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-700" />
                <span>Statutory Registration Particulars</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <strong className="min-w-[150px] text-slate-900">Name of Society:</strong>
                  <span>{associationInfo.fullName}</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <strong className="min-w-[150px] text-slate-900">Registration No.:</strong>
                  <span className="font-bold text-blue-700">{associationInfo.registrationNo} (Dated: {associationInfo.registrationDate})</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <strong className="min-w-[150px] text-slate-900">Governing Act:</strong>
                  <span>Section 3 of Societies Registration Act 2001 (A.P. Act XXXV of 2001)</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <strong className="min-w-[150px] text-slate-900">Jurisdiction:</strong>
                  <span>{associationInfo.jurisdiction}</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <strong className="min-w-[150px] text-slate-900">Registered Office:</strong>
                  <span>{associationInfo.address.doorNo}, {associationInfo.address.landmark}, {associationInfo.address.city}, {associationInfo.address.district}, {associationInfo.address.state} - {associationInfo.address.pincode}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
              <p>
                The Association is formed with <strong>no profit motive</strong> and <strong>no commercial or political activity</strong>. It is established to organize and unite General Category staff of Canara Bank, secure their service interests, promote social and economic justice, and provide mutual welfare.
              </p>
              <blockquote className="border-l-4 border-amber-500 pl-4 py-2 italic text-slate-800 bg-amber-50/50 rounded-r-lg">
                &ldquo;In keeping with the traditions of Canara Bank to assist the Bank in serving to grow and growing to serve.&rdquo;
              </blockquote>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <Scale className="w-5 h-5 text-blue-700 mb-1.5" />
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Constitutional Equality</h4>
                <p className="text-xs text-slate-600 mt-1">Ensuring non-discriminatory treatment under Articles 14 &amp; 16.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <HeartHandshake className="w-5 h-5 text-amber-600 mb-1.5" />
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Member Solidarity</h4>
                <p className="text-xs text-slate-600 mt-1">All for one, one for all. Mutual aid for staff and families.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1.5" />
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Harmonious Growth</h4>
                <p className="text-xs text-slate-600 mt-1">Constructive dialogue with management for bank excellence.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-7 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Statutory Integrity</h3>
                  <p className="text-xs text-blue-200">Registered Andhra Pradesh Society</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-amber-400 font-bold mb-0.5">Democratic Governance</div>
                  <div>Functions through elected delegates, an Executive Committee of 9 members, and triennial general body meetings.</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-amber-400 font-bold mb-0.5">Permanent Bank Employees</div>
                  <div>All office bearers are serving Canara Bank staff with unblemished records, lawfully representing the cadre.</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-amber-400 font-bold mb-0.5">Non-Commercial Guarantee</div>
                  <div>Certified that office bearers are not paid from society funds. 100% of member subscriptions are dedicated to staff welfare and legal protection.</div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-blue-200">
                  <span>General Secretary:</span>
                  <div className="text-white font-bold">Shri Yama Jagadeeswara Reddy</div>
                  <div className="text-[11px] text-amber-300">Sr. Manager, Canara Bank (Staff No: 82302)</div>
                </div>
                <a
                  href="#objectives"
                  className="inline-flex items-center gap-1 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Objectives</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
