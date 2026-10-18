import React from 'react';
import {
  X,
  HeartHandshake,
  HelpCircle,
  DollarSign,
  AlertOctagon,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface NagoraProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NagoraProtocolModal: React.FC<NagoraProtocolModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#F8F7F2] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#267B7E]/20 flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#267B7E] text-white p-6 sm:p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8ADCAE]/20 border border-[#8ADCAE]/40 flex items-center justify-center text-[#8ADCAE]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#8ADCAE]">
                Criterios de seguridad Nagora
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                Cómo resolver situaciones delicadas y límites de la IA
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-[#3A9898]/10 border border-[#3A9898]/20 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#267B7E] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#267B7E]">
              <strong className="block font-semibold">Principio rector de Nagora:</strong>
              Cada respuesta debe transmitir calma y cercanía. Ante el conflicto o la duda, la IA asiste al operador para contener con empatía, sin tomar decisiones que le corresponden a una persona.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Cliente enojado */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#267B7E]">
                <HeartHandshake className="w-4 h-4 text-[#F08A78]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  1. ¿Cliente muy enojado o frustrado?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Qué hace la IA:</strong> Detecta el tono hostil y desescala con empatía. Valida el malestar que le produce el problema sin ponerse a la defensiva ni usar frialdad técnica.
              </p>
              <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 italic">
                "Entiendo perfectamente la molestia que esto te genera en la rutina de tu negocio. Vamos a ayudarte a destrabarlo."
              </div>
            </div>

            {/* 2. Mensaje ambiguo */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#267B7E]">
                <HelpCircle className="w-4 h-4 text-[#3A9898]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  2. ¿El mensaje es ambiguo o vago?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Qué hace la IA:</strong> Prohibido adivinar. Explica con honestidad qué se entendió, qué falta definir y arma 2 o 3 preguntas cotidianas con la fórmula: <em>Qué pasó → qué significa → qué puedo hacer</em>.
              </p>
              <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 italic">
                "¿En qué pantalla estabas cuando se trabó? ¿Te apareció algún cartel con texto o quedó la pantalla en blanco?"
              </div>
            </div>

            {/* 3. Devolución importante */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#267B7E]">
                <DollarSign className="w-4 h-4 text-[#F08A78]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  3. ¿Pide devolución de dinero o nota de crédito?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Qué hace la IA:</strong> Nunca promete ni aprueba reintegros de plata de forma automática. Pide los comprobantes con cortesía y escala el caso para revisión de la Administración/Dirección.
              </p>
              <div className="text-[11px] bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-900 font-medium">
                Decisión humana requerida: Solo el dueño o el área de finanzas puede autorizar transferencias o notas de crédito.
              </div>
            </div>

            {/* 4. Amenaza legal */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#267B7E]">
                <AlertOctagon className="w-4 h-4 text-[#F08A78]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  4. ¿Amenaza legal o Defensa del Consumidor?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Qué hace la IA:</strong> Asigna prioridad ALTA inmediata. No debate, no opina de leyes ni reconoce culpas. Acusa recibo formal con máxima serenidad y deriva de urgencia a Dirección / Legales.
              </p>
              <div className="text-[11px] bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-rose-900 font-medium">
                Regla de oro: Respuesta institucional y sobria. Nunca improvisar acuerdos jurídicos en soporte.
              </div>
            </div>

            {/* 5. Invención de políticas */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#267B7E]">
                <ShieldCheck className="w-4 h-4 text-[#8ADCAE]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  5. ¿La IA puede inventar políticas de cambio?
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Protección anti-alucinación:</strong> La IA tiene bloqueado inventar plazos ficticios (ej. "tenés 30 días", "te reintegramos en 48hs") o porcentajes si tu empresa no los cargó.
              </p>
              <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                Aclara siempre que las condiciones comerciales vigentes deben ser informadas según las pautas de tu negocio.
              </div>
            </div>

            {/* 6. Decisiones prohibidas a la IA */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#267B7E]">
                <UserCheck className="w-4 h-4 text-[#267B7E]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  6. ¿Qué decisiones NO debe tomar la IA?
                </h3>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F08A78]" />
                  Reintegros de dinero o emisión de notas de crédito.
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F08A78]" />
                  Anular facturas o alterar saldos deudores.
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F08A78]" />
                  Dar de baja stock sin recuento físico firmado.
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F08A78]" />
                  Modificar permisos de usuarios o contraseñas.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 p-4 sm:p-5 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-[#3A9898] hover:bg-[#267B7E] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Entendido, volver al asistente
          </button>
        </div>
      </div>
    </div>
  );
};
