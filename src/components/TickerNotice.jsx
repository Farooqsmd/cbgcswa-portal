import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TickerNotice() {
  return (
    <div id="ticker" className="bg-amber-50 border-y border-amber-200 py-2.5 px-4 sm:px-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-amber-900">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
          </span>
          <span className="font-bold uppercase tracking-wider text-[11px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
            Latest Update
          </span>
          <span className="font-medium text-slate-800">
            <strong>Check-Off Facility Rights:</strong> DFS clarifies under RTI that there is no central prohibition against check-off facility for General Category Welfare Associations in PSBs.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#advocacy"
            className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900 hover:underline"
          >
            <span>Read Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
