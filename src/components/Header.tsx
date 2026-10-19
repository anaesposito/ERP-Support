import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  apiConfigured: boolean | null;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ apiConfigured, onOpenGuide }) => {
  return (
    <header className="border-b border-[#267B7E]/15 bg-[#F8F7F2]/95 backdrop-blur-sm sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#267B7E] to-[#3A9898] flex items-center justify-center text-white shadow-md shadow-[#267B7E]/20 shrink-0 font-bold text-xl tracking-tight">
              <span>N</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-lg text-[#267B7E] tracking-tight">
                  Nagora
                </span>
                <span className="text-slate-300">|</span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Asistente IA de Soporte ERP
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8ADCAE]/30 text-[#267B7E] font-medium border border-[#8ADCAE]/50">
                  Es momento de gestionar fácil
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Diagnóstico claro, próximos pasos seguros y respuestas cercanas sin tocar el ERP
              </p>
            </div>
          </div>

          {/* Action & Status Badges */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <button
              type="button"
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#3A9898]/10 text-[#267B7E] border border-[#267B7E]/30 font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#3A9898]" />
              <span>Guía de situaciones delicadas</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-slate-700 border border-slate-200/80 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3A9898]" />
              Solo lectura
            </span>

            {apiConfigured === false && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F08A78]/15 text-[#9E3926] border border-[#F08A78]/30 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-[#F08A78]" />
                API Key pendiente
              </span>
            )}
          </div>
        </div>

        {/* Global Warnings with Nagora Calm Warmth */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-start sm:items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#3A9898]/25 text-slate-700 text-xs sm:text-sm shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#3A9898] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Aviso:</strong> Recomendación generada por IA. Por favor, verificá el análisis con tu equipo responsable antes de realizar cambios en el ERP.
            </span>
          </div>
          <div className="flex items-start sm:items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#F8F7F2] text-slate-500 text-[11px]">
            <Lock className="w-3 h-3 text-slate-400 shrink-0" />
            <span>
              <strong>Privacidad:</strong> No ingreses contraseñas, datos bancarios ni información personal innecesaria. El asistente opera en memoria y no ejecuta transacciones automáticas.
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
