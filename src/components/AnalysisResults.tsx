import React, { useState } from 'react';
import { AnalysisRequest, ERPAnalysisResult } from '../types/erp';
import { PriorityBadge } from './PriorityBadge';
import { SuggestedReplyCard } from './SuggestedReplyCard';
import { MissingInfoCard } from './MissingInfoCard';
import { formatFullAnalysisAsMarkdown } from '../utils/formatReport';
import {
  FileText,
  Workflow,
  Tag,
  Lightbulb,
  ListOrdered,
  Users2,
  Wrench,
  Copy,
  Check,
  Download,
  ShieldCheck,
  HeartHandshake,
  AlertOctagon,
  UserCheck,
  ShieldAlert,
  Info,
} from 'lucide-react';

interface AnalysisResultsProps {
  request: AnalysisRequest;
  result: ERPAnalysisResult;
  onNewAnalysis?: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  request,
  result,
}) => {
  const [copiedFull, setCopiedFull] = useState(false);

  const handleCopyFullAnalysis = async () => {
    try {
      const fullText = formatFullAnalysisAsMarkdown(request, result);
      await navigator.clipboard.writeText(fullText);
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const fullText = formatFullAnalysisAsMarkdown(request, result);
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analisis-nagora-erp-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getEmotionalBadge = (estado: string) => {
    switch (estado) {
      case 'muy_enojado':
        return {
          label: 'Cliente muy enojado / Frustrado',
          bg: 'bg-[#F08A78]/20 text-[#9E3926] border-[#F08A78]/50',
          dot: 'bg-[#F08A78]',
        };
      case 'preocupado':
        return {
          label: 'Cliente preocupado / Ansioso',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500',
        };
      case 'colaborativo':
        return {
          label: 'Colaborativo y paciente',
          bg: 'bg-[#8ADCAE]/30 text-[#267B7E] border-[#8ADCAE]/60',
          dot: 'bg-[#3A9898]',
        };
      default:
        return {
          label: 'Neutral',
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          dot: 'bg-slate-400',
        };
    }
  };

  const emotionalBadge = getEmotionalBadge(result.analisisEmocional?.estado || 'neutral');

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white rounded-3xl border border-[#267B7E]/20 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#8ADCAE] animate-pulse ring-4 ring-[#8ADCAE]/30" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Análisis del caso completado
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Revisión integral con foco en claridad humana, seguridad en el ERP y desescalada
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleCopyFullAnalysis}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              copiedFull
                ? 'bg-[#267B7E] text-white'
                : 'bg-[#3A9898] hover:bg-[#267B7E] text-white'
            }`}
          >
            {copiedFull ? (
              <>
                <Check className="w-4 h-4 text-[#8ADCAE]" />
                <span>¡Informe completo copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar análisis completo</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
            title="Descargar informe en archivo de texto"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Descargar .txt</span>
          </button>
        </div>
      </div>

      {/* Special Situation Alert Banner if detected */}
      {result.situacionEspecial && result.situacionEspecial.detectada && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#F08A78]/15 border-2 border-[#F08A78]/50 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F08A78] text-white flex items-center justify-center shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E3926]">
                Protocolo para situación especial activado
              </span>
              <h3 className="text-base font-bold text-[#9E3926]">
                {result.situacionEspecial.alerta}
              </h3>
            </div>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl border border-[#F08A78]/30 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            <strong className="text-[#9E3926] block mb-1">Pauta de acción inmediata:</strong>
            {result.situacionEspecial.accionRecomendada}
          </div>
        </div>
      )}

      {/* Emotional State & Empathy Card */}
      {result.analisisEmocional && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#267B7E]/15 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#8ADCAE]/20 text-[#267B7E] flex items-center justify-center">
                <HeartHandshake className="w-4 h-4 text-[#3A9898]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Estado emocional del solicitante y consejo de desescalada
              </h3>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${emotionalBadge.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${emotionalBadge.dot}`} />
              {emotionalBadge.label}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-slate-200">
              <strong className="text-slate-800 block mb-1">Percepción observada:</strong>
              <p className="text-slate-600 leading-relaxed">{result.analisisEmocional.descripcion}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#3A9898]/10 border border-[#3A9898]/20">
              <strong className="text-[#267B7E] block mb-1">Recomendación para responder:</strong>
              <p className="text-[#267B7E] font-medium leading-relaxed">
                {result.analisisEmocional.protocoloDesescalada}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Main Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1 & 2: Resumen y Ficha de Clasificación (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-[#267B7E] tracking-wider uppercase flex items-center gap-1.5 mb-1.5">
              <FileText className="w-4 h-4 text-[#3A9898]" />
              1. Resumen claro de lo que ocurrió
            </span>
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              {result.resumenProblema}
            </p>
          </div>

          {/* Module & Process Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-slate-200">
              <span className="text-[11px] font-bold text-[#267B7E] uppercase tracking-wider flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-[#3A9898]" />
                2. Módulo y proceso afectados
              </span>
              <div className="mt-2.5 space-y-1">
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-800">Módulo:</strong>{' '}
                  <span className="capitalize">{result.moduloProcesoAfectados.modulo}</span>
                </div>
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-800">Proceso:</strong>{' '}
                  {result.moduloProcesoAfectados.proceso}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 italic leading-relaxed">
                  {result.moduloProcesoAfectados.detalle}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-slate-200">
              <span className="text-[11px] font-bold text-[#267B7E] uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#3A9898]" />
                3. Tipo de caso (ITIL)
              </span>
              <div className="mt-2.5">
                <span className="inline-block px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#3A9898]/15 text-[#267B7E] border border-[#3A9898]/30">
                  {result.tipoCaso}
                </span>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  Para registrar y clasificar el ticket en el historial de soporte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Prioridad & Justificación (Span 1) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                4. Nivel de prioridad
              </span>
              <PriorityBadge priority={result.prioridad} size="md" />
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1.5">
              <span className="font-bold text-slate-900 block">Por qué esta prioridad:</span>
              <p>{result.justificacionPrioridad}</p>
            </div>
          </div>

          <div className="pt-3 text-[11px] text-slate-400 border-t border-slate-100 leading-relaxed">
            *Evaluada por impacto real en las operaciones y si existe alternativa para trabajar, no solo por la urgencia declarada.
          </div>
        </div>
      </div>

      {/* Card 5: Posibles Causas (Aclaradas como Hipótesis) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              5. Posibles causas (hipótesis preliminares por verificar)
            </h3>
          </div>
          <span className="text-[11px] px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold">
            Requieren comprobación
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Ninguna causa debe tomarse como un diagnóstico cerrado hasta revisarla en el sistema:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {result.posiblesCausas.map((causa, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F8F7F2] hover:bg-slate-100/80 border border-slate-200 transition-colors flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-white text-[#267B7E] border border-[#267B7E]/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {causa}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Card 6: Información Faltante (DESTACADA) */}
      <MissingInfoCard informacionFaltante={result.informacionFaltante} />

      {/* Card 7: Próximos Pasos Recomendados (Ordenados y Seguros) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8ADCAE]/20 text-[#267B7E] flex items-center justify-center">
              <ListOrdered className="w-4 h-4 text-[#3A9898]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              7. Próximos pasos seguros que podés hacer ahora
            </h3>
          </div>
          <span className="text-[11px] px-3 py-1 rounded-full bg-[#8ADCAE]/20 text-[#267B7E] border border-[#8ADCAE]/40 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3A9898]" />
            Verificaciones seguras / Sin alterar datos
          </span>
        </div>

        <ol className="space-y-3">
          {result.proximosPasos.map((paso, idx) => (
            <li
              key={idx}
              className="p-4 rounded-2xl bg-[#F8F7F2] border border-slate-200/90 text-xs sm:text-sm text-slate-800 flex items-start gap-3.5"
            >
              <span className="w-7 h-7 rounded-xl bg-[#3A9898] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                {idx + 1}
              </span>
              <div className="leading-relaxed font-medium pt-0.5">
                {paso}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Human Decisions Guardrail (CRÍTICO: Qué decisiones NO debe tomar la IA) */}
      {result.decisionesHumanasRequeridas && result.decisionesHumanasRequeridas.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-[#267B7E]/30 p-6 sm:p-7 shadow-sm space-y-3">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-[#267B7E] text-white flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Decisiones que NO debe tomar la IA (requieren autorización humana)
              </h3>
              <p className="text-xs text-slate-500">
                La herramienta no aprueba cambios de dinero, modificaciones fiscales ni alteraciones críticas
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {result.decisionesHumanasRequeridas.map((decision, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F8F7F2] border border-slate-200 text-xs sm:text-sm text-slate-800"
              >
                <span className="w-2 h-2 rounded-full bg-[#F08A78] mt-2 shrink-0" />
                <span className="leading-relaxed font-medium">{decision}</span>
              </div>
            ))}
          </div>

          {result.politicaComercialAdvertencia && (
            <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 border border-slate-200 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-[#3A9898] shrink-0 mt-0.5" />
              <span>
                <strong>Aviso de políticas:</strong> {result.politicaComercialAdvertencia}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card 8 & 9: Derivación y Especialización (Grid 2 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 8: Equipo de Derivación */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Users2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              8. A quién conviene derivar el caso
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-900">Equipo responsable:</span>
              <span className="text-xs px-3 py-1 rounded-full bg-purple-700 text-white font-bold uppercase tracking-wider">
                {result.equipoDerivacion.equipo}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
              <strong>Motivo:</strong> {result.equipoDerivacion.justificacion}
            </p>
          </div>
        </div>

        {/* Card 9: Intervención Especializada (DESTACADA) */}
        <div
          className={`rounded-3xl border-2 p-6 sm:p-7 space-y-3 transition-colors ${
            result.intervencionEspecializada.requerida
              ? 'bg-[#F08A78]/10 border-[#F08A78]/40'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  result.intervencionEspecializada.requerida
                    ? 'bg-[#F08A78] text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                9. Intervención especializada
              </h3>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                result.intervencionEspecializada.requerida
                  ? 'bg-[#F08A78] text-white shadow-xs'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {result.intervencionEspecializada.requerida ? 'Requerida' : 'No requerida'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {result.intervencionEspecializada.motivo}
          </p>
          {result.intervencionEspecializada.requerida && (
            <p className="text-[11px] text-[#9E3926] bg-[#F08A78]/20 p-2.5 rounded-xl font-medium">
              Nota: Debe ser atendido por la Dirección, responsable de seguridad o consultor senior autorizado.
            </p>
          )}
        </div>
      </div>

      {/* Card 10: Respuesta Sugerida para el Usuario (Editable & Copiable) */}
      <SuggestedReplyCard
        initialReply={result.respuestaSugerida}
        tone={request.tono}
      />

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 bg-white rounded-3xl border border-slate-200">
        <div className="text-xs text-slate-600">
          ¿Querés registrar o analizar otro caso?
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopyFullAnalysis}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              copiedFull
                ? 'bg-[#267B7E] text-white'
                : 'bg-[#F8F7F2] hover:bg-slate-200 border border-slate-300 text-slate-800'
            }`}
          >
            {copiedFull ? <Check className="w-4 h-4 text-[#8ADCAE]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedFull ? '¡Copiado!' : 'Copiar informe completo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
