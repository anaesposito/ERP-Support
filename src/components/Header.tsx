import React from 'react';
import { LifeBuoy } from 'lucide-react';

export const Header: React.FC = () => (
  <header className="border-b border-[#267B7E]/10 bg-white">
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between gap-4">
      <a href="/" className="flex items-center gap-3 text-[#267B7E]" aria-label="Nagora, inicio de soporte">
        <span className="w-10 h-10 rounded-2xl bg-[#267B7E] text-white flex items-center justify-center text-xl font-bold">N</span>
        <span className="font-extrabold text-xl tracking-tight">Nagora</span>
      </a>
      <span className="flex items-center gap-2 text-sm font-medium text-slate-600"><LifeBuoy className="w-4 h-4" />Centro de ayuda</span>
    </div>
  </header>
);
