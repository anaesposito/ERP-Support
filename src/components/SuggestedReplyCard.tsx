import React, { useState } from 'react';
import { Tone } from '../types/erp';
import { MessageSquare, Copy, Check, Edit3, RotateCcw } from 'lucide-react';

interface SuggestedReplyCardProps {
  initialReply: string;
  tone: Tone;
}

export const SuggestedReplyCard: React.FC<SuggestedReplyCardProps> = ({
  initialReply,
  tone,
}) => {
  const [replyText, setReplyText] = useState(initialReply);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(replyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setReplyText(initialReply);
    setIsEditing(false);
  };

  const toneLabel = {
    cercano: 'Tono cercano (empático, comprensivo y sereno)',
    sencillo: 'Tono sencillo (claro y directo para el día a día)',
    tecnico: 'Tono técnico (preciso y orientado a sistemas)',
  }[tone];

  return (
    <div className="bg-white rounded-3xl border border-[#3A9898]/30 shadow-sm p-6 sm:p-7 space-y-4 ring-1 ring-[#3A9898]/15">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#8ADCAE]/20 text-[#267B7E] flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5 text-[#3A9898]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              10. Respuesta sugerida para el usuario o cliente
            </h3>
            <p className="text-xs text-[#267B7E] font-medium">{toneLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {replyText !== initialReply && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              title="Restaurar respuesta original"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs text-[#267B7E] hover:text-[#3A9898] px-3 py-1.5 rounded-xl border border-[#267B7E]/20 hover:bg-[#3A9898]/5 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Ver texto listo' : 'Editar mensaje'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              copied
                ? 'bg-[#267B7E] text-white'
                : 'bg-[#3A9898] hover:bg-[#267B7E] text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#8ADCAE]" />
                <span>¡Mensaje copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar para enviar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            rows={7}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-4 rounded-2xl text-sm border border-[#3A9898]/40 focus:outline-none focus:ring-3 focus:ring-[#3A9898]/15 font-sans leading-relaxed text-slate-800 resize-y bg-[#F8F7F2]/40"
          />
          <p className="text-xs text-slate-400">
            Podés personalizar el nombre del cliente o sumar algún detalle particular de tu comercio.
          </p>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-[#F8F7F2] border border-[#267B7E]/15 text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line font-sans select-text">
          {replyText}
        </div>
      )}
    </div>
  );
};
