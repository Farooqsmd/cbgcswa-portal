import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  BadgePercent, 
  GraduationCap, 
  FileText, 
  Handshake, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle 
} from 'lucide-react';
import { keyObjectives } from '../data/associationData';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Scale: Scale,
  BadgePercent: BadgePercent,
  GraduationCap: GraduationCap,
  FileText: FileText,
  Handshake: Handshake
};

export default function ObjectivesSection() {
  const [showAllObjectives, setShowAllObjectives] = useState(false);

  const fullObjectivesList = [
    'To organize and unite the General Category staff of Canara Bank and regulate their relations with their employers.',
    'To secure to all General Category staff of Canara Bank welfare, justice - Social and economic.',
    'To promote fraternity, unity, friendship, equality of opportunity, humane conditions of work, and better promotional avenues.',
    'To secure better retirement, housing, health, and medical benefits.',
    'To promote education and economic interests of General Category staff children and secure financial assistance for higher education.',
    'To secure proper representation for General Category staff on the Board of Directors of Canara Bank.',
    'To promote cordial relationships among staff and between staff and the Management of Canara Bank.',
    'To assist members in developing talents in fine arts, sports, athletics, gymnastics, and public speaking.',
    'To organize and conduct seminars, debates, and study classes on Banking, Commerce, Economics, and allied subjects.',
    'To conduct competitions, essay writing, and oratorical contests for employees and their family members.',
    'To take timely steps for redressing the grievances of all General Category staff.',
    'To provide pecuniary, legal, or other assistance to officers/staff defending or prosecuting proceedings relating to their employment.',
    'To delegate representatives to State and National conferences.',
    'To assist the Bank in serving to grow and growing to serve with professional excellence.'
  ];

  return (
    <section id="objectives" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Aims &amp; Charter
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            Our Core Objectives &amp; Commitments
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            As enshrined in Document No. 1 of our registered Bye-Laws, the Association is dedicated to comprehensive professional, legal, and personal welfare for all General Category staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {keyObjectives.map((obj) => {
            const IconComponent = iconMap[obj.icon] || ShieldCheck;
            return (
              <div
                key={obj.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {obj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {obj.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Constitutional Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setShowAllObjectives(!showAllObjectives)}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                30+
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  View Full List of Statutory Aims &amp; Objectives
                </h3>
                <p className="text-xs text-slate-500">
                  Extracted from Document No. 1 registered under AP Societies Act 35 of 2001
                </p>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
              {showAllObjectives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAllObjectives && (
            <div className="mt-5 pt-5 border-t border-slate-200">
              <ol className="space-y-2.5 list-decimal list-inside text-xs sm:text-sm text-slate-700 leading-relaxed">
                {fullObjectivesList.map((item, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="font-normal">{item}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                <span>The complete verbatim copy of all 30 clauses is maintained in the official registered bye-laws of the Association.</span>
                <span className="font-semibold text-blue-800 ml-2 shrink-0">Statutory Record</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
