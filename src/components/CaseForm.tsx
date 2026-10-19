import React from 'react';
import { ArrowRight, Loader2, Lock, RotateCcw } from 'lucide-react';
import type { AnalysisRequest, ERPModule, Priority } from '../types/erp';

interface Props {
  formData: AnalysisRequest;
  onChange: (updates: Partial<AnalysisRequest>) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
  validationError: string | null;
}
const modules: {value: ERPModule; label: string}[] = [
  {value: 'otro', label: 'No estoy seguro'}, {value: 'ventas', label: 'Ventas y clientes'},
  {value: 'finanzas', label: 'Facturación y pagos'}, {value: 'inventario', label: 'Stock e inventario'},
  {value: 'compras', label: 'Compras y proveedores'}, {value: 'produccion', label: 'Producción'},
  {value: 'recursos_humanos', label: 'Equipo y personal'},
];
const levels: {value: Priority; label: string; description: string}[] = [
  {value: 'baja', label: 'Bajo', description: 'Tengo una duda o un inconveniente que me permite seguir trabajando.'},
  {value: 'media', label: 'Medio', description: 'Una tarea importante está afectada, pero puedo continuar de otra manera.'},
  {value: 'alta', label: 'Alto', description: 'No puedo continuar con una tarea esencial o el problema afecta a varias personas.'},
];
const field = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A9898]/30 focus:border-[#3A9898] disabled:opacity-60';

export const CaseForm: React.FC<Props> = ({formData, onChange, onSubmit, onClear, isLoading, validationError}) => (
  <form onSubmit={event => { event.preventDefault(); onSubmit(); }} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
    <div>
      <label htmlFor="case-description" className="block text-base font-bold text-slate-900 mb-2">¿En qué podemos ayudarte?</label>
      <p id="message-help" className="text-sm text-slate-500 mb-3">Contanos qué estabas intentando hacer y qué ocurrió. También podés pegar el mensaje relacionado con tu consulta.</p>
      <textarea id="case-description" rows={6} value={formData.descripcion} onChange={e => onChange({descripcion:e.target.value})}
        placeholder="Describí tu consulta o el inconveniente que estás teniendo…" required disabled={isLoading}
        aria-describedby={validationError ? 'message-help message-error' : 'message-help'} aria-invalid={Boolean(validationError)}
        className={`${field} resize-y leading-relaxed`} />
      {validationError && <p id="message-error" role="alert" className="text-sm text-red-700 mt-2">{validationError}</p>}
      <p className="flex items-start gap-2 text-xs text-slate-500 mt-3"><Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />No compartas contraseñas, datos bancarios ni información personal innecesaria. Tu consulta se procesa con asistencia de IA.</p>
    </div>
    <div>
      <label htmlFor="case-module" className="block text-sm font-semibold text-slate-800 mb-2">¿Con qué parte de Nagora está relacionada?</label>
      <select id="case-module" value={formData.modulo} onChange={e => onChange({modulo:e.target.value as ERPModule})} disabled={isLoading} className={field}>
        {modules.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
    </div>
    <details className="rounded-2xl border border-slate-200 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-[#267B7E]">Agregar detalles para recibir una mejor orientación <span className="font-normal text-slate-500">(opcional)</span></summary>
      <div className="grid sm:grid-cols-2 gap-4 mt-5">
        <div className="sm:col-span-2"><label htmlFor="case-error" className="block text-sm text-slate-700 mb-2">Si aparece un error, ¿qué dice?</label>
          <input id="case-error" value={formData.mensajeError || ''} onChange={e => onChange({mensajeError:e.target.value})} disabled={isLoading} className={field} /></div>
        <div><label htmlFor="case-people" className="block text-sm text-slate-700 mb-2">¿A quiénes les ocurre?</label>
          <input id="case-people" value={formData.usuariosAfectados || ''} onChange={e => onChange({usuariosAfectados:e.target.value})} disabled={isLoading} className={field} /></div>
        <div><label htmlFor="case-workaround" className="block text-sm text-slate-700 mb-2">¿Podés seguir trabajando?</label>
          <select id="case-workaround" value={formData.tieneAlternativa} onChange={e => onChange({tieneAlternativa:e.target.value as AnalysisRequest['tieneAlternativa']})} disabled={isLoading} className={field}>
            <option value="desconocido">Todavía no lo sé</option><option value="si">Sí, de otra manera</option><option value="no">No, la tarea está detenida</option>
          </select></div>
      </div>
    </details>
    <fieldset disabled={isLoading}>
      <legend className="text-sm font-semibold text-slate-800 mb-3">¿Qué tan crítico es tu problema?</legend>
      <div className="grid sm:grid-cols-3 gap-3">{levels.map(level => (
        <label key={level.value} className={`flex items-start gap-2 cursor-pointer p-3 rounded-xl border ${formData.criticidad === level.value ? 'border-[#3A9898] bg-[#3A9898]/5' : 'border-slate-200'}`}>
          <input type="radio" name="criticality" value={level.value} checked={formData.criticidad === level.value} onChange={() => onChange({criticidad:level.value})} className="mt-1 accent-[#267B7E]" />
          <span><span className="block text-sm font-semibold text-slate-800">{level.label}</span><span className="block text-xs text-slate-500 mt-1">{level.description}</span></span>
        </label>
      ))}</div>
      <p className="text-xs text-slate-500 mt-3">Elegí el nivel que mejor refleje cómo te afecta. Lo tendremos en cuenta junto con la descripción para orientar tu consulta.</p>
    </fieldset>
    <section aria-labelledby="support-process" className="rounded-2xl bg-[#3A9898]/5 border border-[#3A9898]/20 p-5">
      <h2 id="support-process" className="text-base font-bold text-slate-900">¿Cómo vamos a ayudarte?</h2>
      <ol className="list-decimal pl-5 space-y-3 mt-3 text-sm text-slate-700 leading-relaxed">
        <li><strong>Revisamos tu consulta.</strong> Al presionar Recibir ayuda, analizamos lo que nos contás y el impacto que seleccionaste.</li>
        <li><strong>Te orientamos en esta pantalla.</strong> Vas a recibir una respuesta y pasos concretos. Si falta información, te indicaremos qué datos agregar.</li>
        <li><strong>Si necesitás atención de una persona, te indicamos cómo seguir.</strong> Podrás guardar el resumen y compartirlo por el canal habitual de soporte de tu empresa, para que revisen tu caso y acuerden con vos cómo continuar.</li>
      </ol>
      <p className="text-xs text-slate-500 mt-4">Desde esta página no se envían correos ni se realizan llamadas, y no se crea un ticket automáticamente. La respuesta inicial se muestra aquí; para el contacto personal, utilizá tu canal de soporte habitual.</p>
    </section>
    <div className="flex flex-col sm:flex-row-reverse gap-3 sm:items-center sm:justify-between pt-2">
      <button type="submit" disabled={isLoading || !formData.descripcion.trim()} className="flex items-center justify-center gap-2 bg-[#267B7E] hover:bg-[#206568] text-white px-6 py-3.5 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}{isLoading ? 'Estamos revisando tu consulta…' : 'Recibir ayuda'}
      </button>
      <button type="button" onClick={onClear} disabled={isLoading} className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 px-3 py-3 text-sm disabled:opacity-50"><RotateCcw className="w-4 h-4" />Borrar y empezar de nuevo</button>
    </div>
    {isLoading && <p role="status" className="text-sm text-slate-600">Esto puede demorar unos segundos. Conservamos tu mensaje en el formulario mientras preparamos la respuesta.</p>}
  </form>
);
