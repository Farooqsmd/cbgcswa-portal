import React, { useState } from 'react';
import { Menu, X, UserPlus, Phone, Mail } from 'lucide-react';
import AssociationLogo from './AssociationLogo';
import { associationInfo } from '../data/associationData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Objectives', href: '#objectives' },
    { name: 'Advocacy & Rights', href: '#advocacy' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500 text-slate-950">
              OFFICIAL BODY
            </span>
            <span className="hidden sm:inline font-medium">
              Registered under AP Societies Registration Act 35 of 2001 (Regd. No. {associationInfo.registrationNo})
            </span>
            <span className="sm:hidden font-medium">
              Regd. No. {associationInfo.registrationNo}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <a href={`mailto:${associationInfo.email}`} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <Mail className="w-3 h-3" />
              <span className="hidden md:inline">{associationInfo.email}</span>
            </a>
            <a href={`tel:${associationInfo.phone}`} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3" />
              <span>{associationInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <a href="#home" className="focus:outline-none">
          <AssociationLogo />
        </a>

        <div className="hidden lg:flex items-center gap-4 xl:gap-5">
          <div className="flex items-center gap-3.5 xl:gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors py-1 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-300 mx-1"></div>

          <a
            href="#membership"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold text-xs xl:text-sm px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            <span>Join Association</span>
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-50 px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-200">
            <a
              href="#membership"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-3 px-4 rounded-lg shadow"
            >
              <UserPlus className="w-4 h-4 text-amber-300" />
              <span>Join Association Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
