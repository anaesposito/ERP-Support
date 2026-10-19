import React, { useState } from 'react';
import { Check, Copy, Download, ArrowRight, AlertCircle, CircleCheck } from 'lucide-react';
import type { AnalysisRequest, ERPAnalysisResult } from '../types/erp';
import { PriorityBadge } from './PriorityBadge';

interface Props { request: AnalysisRequest; result: ERPAnalysisResult; onNewAnalysis?: () => void; }
const card = 'bg-white rounded-3xl border border-slate-200 p-6 sm:p-8';
const emotions = {muy_enojado:'Frustración o enojo', preocupado:'Preocupación', neutral:'Neutral', colaborativo:'Tranquilidad y colaboración'};

export const AnalysisResults: React.FC<Props> = ({request, result, onNewAnalysis}) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const summary = `TU CONSULTA\n${request.descripcion}\n\nRESPUESTA\n${result.respuestaSugerida}\n\nPRÓXIMOS PASOS\n${result.proximosPasos.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\nATENCIÓN DEL CASO\n${result.resolucion.automatica ? 'Orientación automática' : 'Requiere revisión humana'}\n${result.resolucion.motivo}${result.informacionFaltante.detectada ? `\n\nINFORMACIÓN POR COMPLETAR\n${result.informacionFaltante.detalles}\n${result.informacionFaltante.preguntasSugeridas.join('\n')}` : ''}\n\nEsta orientación fue generada con asistencia de IA. No se creó un ticket ni se enviaron mensajes al equipo de soporte.`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(result.respuestaSugerida); setCopyError(false); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { setCopyError(true); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([summary], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'mi-consulta-nagora.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <div className="space-y-5">
    <div className={card}>
      <div className="flex items-center gap-2 text-[#267B7E] mb-3"><CircleCheck className="w-5 h-5" /><span className="text-sm font-semibold">Orientación para tu consulta</span></div>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Esto es lo que podés hacer</h2>
      <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">{result.respuestaSugerida}</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <button type="button" onClick={copy} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? 'Respuesta copiada' : 'Copiar respuesta'}</button>
        <button type="button" onClick={download} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50"><Download className="w-4 h-4" />Guardar resumen</button>
      </div>
      {copyError && <p role="alert" className="text-sm text-amber-800 mt-3">No pudimos copiarla. Podés seleccionar el texto o guardar el resumen.</p>}
      <p className="text-xs text-slate-500 mt-4">Respuesta generada con asistencia de IA. Si algo no coincide con tu situación, completá tu consulta antes de seguir.</p>
    </div>
    {result.informacionFaltante.detectada && <div role="alert" className="rounded-3xl border border-amber-300 bg-amber-50 p-6 sm:p-8">
      <h3 className="flex items-center gap-2 text-lg font-bold text-amber-950"><AlertCircle className="w-5 h-5 shrink-0" />Necesitamos algunos datos más</h3>
      <p className="text-sm text-amber-950 mt-3 leading-relaxed">{result.informacionFaltante.detalles}</p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-amber-950 mt-4">{result.informacionFaltante.preguntasSugeridas.map((question, index) => <li key={index}>{question}</li>)}</ul>
      <button onClick={onNewAnalysis} type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#267B7E]">Completar mi consulta <ArrowRight className="w-4 h-4" /></button>
    </div>}
    <div className={card}>
      <h3 className="text-lg font-bold text-slate-900 mb-4">Próximos pasos</h3>
      <ol className="space-y-4">{result.proximosPasos.map((step,index) => <li key={index} className="flex gap-3 items-start"><span className="w-7 h-7 shrink-0 bg-[#3A9898]/10 rounded-full flex items-center justify-center text-sm font-bold text-[#267B7E]">{index + 1}</span><p className="text-sm text-slate-700 leading-relaxed pt-0.5">{step}</p></li>)}</ol>
    </div>
    <div className={card} role="status">
      <h3 className="text-lg font-bold text-slate-900">{result.resolucion.automatica ? 'Tu consulta puede resolverse con orientación automática' : 'Tu caso necesita revisión humana'}</h3>
      <p className="text-sm text-slate-700 mt-3 leading-relaxed">{result.resolucion.motivo}</p>
      {!result.resolucion.automatica && <p className="text-sm text-slate-700 mt-3">Si necesitás contactar al equipo de soporte, guardá el resumen y compartilo por el canal que utilizás habitualmente. Área sugerida: <strong>{result.equipoDerivacion.equipo}</strong>.</p>}
      <p className="text-xs text-slate-500 mt-4">Esta consulta no crea un ticket ni envía un aviso al equipo de soporte.</p>
    </div>
    <details className={card}>
      <summary className="cursor-pointer text-sm font-semibold text-[#267B7E]">Ver el detalle de tu consulta</summary>
      <div className="space-y-5 mt-5 text-sm text-slate-700">
        <div><h3 className="font-bold text-slate-900 mb-2">Lo que entendimos</h3><p>{result.resumenProblema}</p></div>
        <dl className="grid sm:grid-cols-2 gap-4">
          {request.criticidad && <div><dt className="font-semibold text-slate-900">Impacto que nos indicaste</dt><dd className="mt-1">{{baja:'Bajo', media:'Medio', alta:'Alto'}[request.criticidad]}</dd></div>}
          <div><dt className="font-semibold text-slate-900">Tipo de consulta</dt><dd className="mt-1 capitalize">{result.tipoCaso}</dd></div>
          <div><dt className="font-semibold text-slate-900 mb-2">Urgencia estimada</dt><dd><PriorityBadge priority={result.prioridad} size="sm" /></dd></div>
          <div><dt className="font-semibold text-slate-900">Área relacionada</dt><dd className="mt-1">{result.moduloProcesoAfectados.modulo}</dd></div>
          <div><dt className="font-semibold text-slate-900">Cómo interpretamos el tono de tu mensaje</dt><dd className="mt-1">{emotions[result.analisisEmocional.estado]} <span className="text-slate-500">(estimación de IA)</span></dd></div>
        </dl>
        <p>{result.justificacionPrioridad}</p>
        {result.posiblesCausas.length > 0 && <div><h3 className="font-bold text-slate-900 mb-2">Qué podría estar ocurriendo</h3><p className="text-xs text-slate-500 mb-2">Estas posibilidades necesitan confirmación.</p><ul className="list-disc pl-5 space-y-2">{result.posiblesCausas.map((cause,index) => <li key={index}>{cause}</li>)}</ul></div>}
      </div>
    </details>
    <div className="flex justify-end"><button type="button" onClick={onNewAnalysis} className="text-sm font-semibold text-[#267B7E] flex items-center gap-2 py-3">Volver a mi consulta <ArrowRight className="w-4 h-4" /></button></div>
  </div>;
};
