import React, { useState } from 'react';
import { FileText, Clock, Download, ShieldCheck, Search, CheckCircle } from 'lucide-react';
import { downloadsList } from '../data/associationData';

export default function DownloadsSection() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Legal / Governance', 'Statutory', 'Representations', 'RTI Records', 'Membership'];

  const filteredDocs = downloadsList.filter((doc) => {
    const matchesCat = filter === 'All' || doc.category === filter;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="downloads" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Document Repository
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            Official Documents, Bye-Laws &amp; Circulars
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Access transparent public records, government correspondence, registration certificates, and printable application forms.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  filter === cat
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-300 hover:bg-white hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {doc.category}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    {doc.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                  {doc.fileType}
                </span>

                {doc.id === 'offline-form' ? (
                  <a
                    href="/docs/membership-form.pdf"
                    download="CBGCSWA-Membership-Form.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Form</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>Available via Secretariat</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note on official files */}
        <div className="mt-12 max-w-2xl mx-auto text-center p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
          <strong>Notice for Members:</strong> For any certified extract of resolutions, authenticated records, or special assistance, please contact the General Secretary at <a href="mailto:cbgcswa@gmail.com" className="font-bold underline">cbgcswa@gmail.com</a>.
        </div>
      </div>
    </section>
  );
}
