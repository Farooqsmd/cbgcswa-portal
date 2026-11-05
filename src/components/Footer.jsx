import React from 'react';
import AssociationLogo from './AssociationLogo';
import { associationInfo } from '../data/associationData';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Identity */}
          <div className="space-y-3 lg:col-span-2">
            <AssociationLogo textColor="text-white" subtitleColor="text-amber-400" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-md pt-2">
              A registered, non-political, voluntary welfare association committed to safeguarding the service conditions, equality, and holistic welfare of General Category employees in Canara Bank nationwide.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                Regd. No. {associationInfo.registrationNo}
              </span>
              <span>&bull;</span>
              <span>AP Societies Registration Act 2001</span>
              <span>&bull;</span>
              <span>All-India Jurisdiction</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home Portal</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About the Association</a></li>
              <li><a href="#objectives" className="hover:text-amber-400 transition-colors">Constitutional Objectives</a></li>
              <li><a href="#advocacy" className="hover:text-amber-400 transition-colors">Check-Off &amp; Policy Parity</a></li>
              <li><a href="#leadership" className="hover:text-amber-400 transition-colors">Executive Committee</a></li>
              <li><a href="#membership" className="hover:text-amber-400 transition-colors">Join as Member</a></li>
              <li><a href="#downloads" className="hover:text-amber-400 transition-colors">Circulars &amp; Downloads</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
              Central Secretariat
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {associationInfo.address.doorNo}, {associationInfo.address.landmark},<br />
              {associationInfo.address.city} - {associationInfo.address.pincode},<br />
              {associationInfo.address.state}, India.
            </p>
            <div className="pt-2 space-y-1">
              <div>Email: <a href={`mailto:${associationInfo.email}`} className="text-amber-400 hover:underline">{associationInfo.email}</a></div>
              <div>Phone: <a href={`tel:${associationInfo.phone}`} className="text-white font-bold">{associationInfo.phone}</a></div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {associationInfo.fullName}. All Rights Reserved.
          </div>
          <div className="text-slate-300 font-medium">
            Developed and Maintained by <span className="font-bold text-amber-400 tracking-wide">F4 Labs</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="italic text-slate-400 font-bold">&ldquo;All for one, one for all&rdquo;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
