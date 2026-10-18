import React, { useState } from 'react';
import { FileQuestion, Copy, Check, HelpCircle, CheckCircle2 } from 'lucide-react';

interface MissingInfoCardProps {
  informacionFaltante: {
    detectada: boolean;
    detalles: string;
    preguntasSugeridas: string[];
  };
}

export const MissingInfoCard: React.FC<MissingInfoCardProps> = ({ informacionFaltante }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAll = async () => {
    try {
      const text = informacionFaltante.preguntasSugeridas
        .map((p, i) => `${i + 1}. ${p}`)
        .join('\n');
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopySingle = async (pregunta: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(pregunta);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  if (!informacionFaltante.detectada) {
    return (
      <div className="bg-[#8ADCAE]/15 rounded-3xl border border-[#8ADCAE]/50 p-5 sm:p-6 flex items-start gap-4">
        <CheckCircle2 className="w-5 h-5 text-[#267B7E] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-[#267B7E]">
            Información suficiente para avanzar
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Los datos cargados permiten entender qué ocurrió y ordenar los primeros pasos sin necesidad de pedir datos extra.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-[#3A9898]/40 p-6 sm:p-7 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#3A9898]/15 flex items-center justify-center text-[#267B7E]">
            <FileQuestion className="w-5 h-5 text-[#3A9898]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                6. Información que falta precisar
              </h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                Para evitar supuestos
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Datos clave para responder con certeza y no adivinar
            </p>
          </div>
        </div>

        {informacionFaltante.preguntasSugeridas.length > 0 && (
          <button
            type="button"
            onClick={handleCopyAll}
            className="text-xs px-3.5 py-2 rounded-xl bg-[#3A9898]/15 hover:bg-[#3A9898]/25 text-[#267B7E] font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#267B7E]" />
                <span>¡Preguntas copiadas!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar todas las preguntas</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-[#F8F7F2] p-4 rounded-2xl border border-slate-200">
        <strong className="text-[#267B7E] font-bold block mb-1">Qué necesitamos saber:</strong>
        {informacionFaltante.detalles}
      </div>

      {informacionFaltante.preguntasSugeridas.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#3A9898]" />
            Preguntas sencillas sugeridas para hacerle al usuario:
          </h4>
          <ul className="space-y-2">
            {informacionFaltante.preguntasSugeridas.map((pregunta, idx) => (
              <li
                key={idx}
                className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 hover:border-[#3A9898] transition-colors group"
              >
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#267B7E] shrink-0">{idx + 1}.</span>
                  <span className="leading-relaxed">{pregunta}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopySingle(pregunta, idx)}
                  className="text-slate-400 hover:text-[#267B7E] p-1.5 rounded-lg hover:bg-[#8ADCAE]/20 transition-colors shrink-0 cursor-pointer"
                  title="Copiar esta pregunta"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-[#267B7E]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
