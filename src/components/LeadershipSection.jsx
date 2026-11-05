import React from 'react';
import { UserCheck, Shield, Users, Mail, Phone, Award } from 'lucide-react';
import { officeBearers, executiveMembers, associationInfo } from '../data/associationData';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Governing Body &amp; Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            The Executive Committee
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Elected by primary members to manage the affairs of the Association with complete integrity, transparency, and dedication to General Category staff across India.
          </p>
        </div>

        {/* Office Bearers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {officeBearers.map((bearer, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                bearer.role === 'General Secretary' || bearer.role === 'President'
                  ? 'border-blue-300 ring-1 ring-blue-100'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wide">
                    {bearer.role}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-600">
                    {bearer.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                  {bearer.name}
                </h3>
                
                <div className="text-xs font-bold text-blue-700 mb-3">
                  {bearer.occupation} {bearer.staffId ? `(Staff ID: ${bearer.staffId})` : ''}
                </div>

                <div className="space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-slate-400">S/o:</span> {bearer.fatherName}
                  </div>
                  <div>
                    <span className="text-slate-400">Base:</span> {bearer.location}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <UserCheck className="w-3.5 h-3.5" /> Permanent Employee
                </span>
                <span className="text-[11px]">Tenure: 3 Years</span>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Committee Members Table / Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-700" />
            <span>Executive Committee Members</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {executiveMembers.map((member, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 text-sm mb-1">{member.name}</div>
                <div className="text-blue-700 font-semibold mb-1">{member.role}</div>
                <div className="text-slate-500">{member.location}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <strong>Statutory Certification:</strong> All office bearers serve voluntarily with no commercial motive and are not remunerated from Society funds.
            </div>
            <a href={`tel:${associationInfo.phone}`} className="font-bold text-blue-700 hover:underline shrink-0">
              Helpline: {associationInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
