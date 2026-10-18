import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowRight, LifeBuoy, MessageCircle, ShieldCheck } from 'lucide-react';
import type { AnalysisRequest, ERPAnalysisResult } from './types/erp';
import { Header } from './components/Header';
import { CaseForm } from './components/CaseForm';
import { AnalysisResults } from './components/AnalysisResults';

const INITIAL_FORM: AnalysisRequest = {descripcion:'', modulo:'otro', mensajeError:'', usuariosAfectados:'', tieneAlternativa:'desconocido', tono:'cercano'};
export default function App() {
  const [formData,setFormData] = useState<AnalysisRequest>(INITIAL_FORM);
  const [analyzedRequest,setAnalyzedRequest] = useState<AnalysisRequest>(INITIAL_FORM);
  const [analysisResult,setAnalysisResult] = useState<ERPAnalysisResult | null>(null);
  const [isLoading,setIsLoading] = useState(false);
  const [serviceAvailable,setServiceAvailable] = useState<boolean | null>(null);
  const [errorMessage,setErrorMessage] = useState<string | null>(null);
  const [validationError,setValidationError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  useEffect(() => {
    fetch('/api/status').then(response => response.json()).then(data => setServiceAvailable(data.configured === true)).catch(() => setServiceAvailable(null));
  },[]);
  useEffect(() => { if (analysisResult) resultsRef.current?.focus(); }, [analysisResult]);
  const returnToForm = () => { formRef.current?.scrollIntoView({behavior:'smooth', block:'start'}); document.getElementById('case-description')?.focus({preventScroll:true}); };
  const analyze = async () => {
    if (isLoading) return;
    if (!formData.descripcion.trim()) {setValidationError('Contanos qué ocurrió para poder ayudarte.'); return;}
    setIsLoading(true); setErrorMessage(null); setValidationError(null); setAnalysisResult(null);
    try {
      const response = await fetch('/api/analyze', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(formData), signal:AbortSignal.timeout(50000)});
      const data = await response.json();
      if (!response.ok || !data.success || !data.data) {
        setErrorMessage(data.error === 'GEMINI_NOT_CONFIGURED'
          ? 'La asistencia no está disponible en este momento. Intentá nuevamente más tarde.'
          : 'No pudimos preparar tu respuesta. Probá de nuevo en unos instantes.');
        return;
      }
      setAnalyzedRequest({...formData}); setAnalysisResult(data.data);
    } catch {
      setErrorMessage('La respuesta está tardando más de lo esperado o se interrumpió la conexión. Tu mensaje sigue en el formulario; podés volver a intentarlo.');
    } finally {setIsLoading(false);}
  };
  return <div className="min-h-screen bg-[#F8F7F2] text-slate-800 font-sans flex flex-col">
    <Header />
    <main className="w-full max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14 flex-1">
      <section className="max-w-2xl mb-9">
        <p className="text-sm font-semibold text-[#267B7E] mb-3">SOPORTE NAGORA</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">Te ayudamos a seguir trabajando.</h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">Contanos qué necesitás resolver. Te orientamos con pasos claros y, si tu caso necesita una revisión de soporte, te indicamos cómo continuar.</p>
      </section>
      {serviceAvailable === false && <div role="alert" className="rounded-2xl bg-amber-50 border border-amber-200 p-5 mb-6 text-sm text-amber-950">La asistencia está temporalmente fuera de servicio. Podés conservar tu consulta y volver a intentar más tarde.</div>}
      {errorMessage && <div role="alert" className="rounded-2xl bg-red-50 border border-red-200 p-5 mb-6">
        <h2 className="flex gap-2 items-center text-base font-bold text-red-900"><AlertCircle className="w-5 h-5" />No pudimos completar tu consulta</h2>
        <p className="text-sm text-red-900 mt-2">{errorMessage}</p>
        <button type="button" onClick={analyze} disabled={isLoading} className="text-sm font-semibold text-[#267B7E] mt-4 disabled:opacity-50">Volver a intentar</button>
      </div>}
      <section ref={formRef} aria-label="Tu consulta" className="scroll-mt-6">
        <CaseForm formData={formData} onChange={updates => {setFormData(previous => ({...previous,...updates}));setValidationError(null);}}
          onSubmit={analyze} onClear={() => {setFormData({...INITIAL_FORM});setAnalysisResult(null);setErrorMessage(null);setValidationError(null);}}
          isLoading={isLoading} validationError={validationError} />
      </section>
      {analysisResult && <section ref={resultsRef} id="analysis-results-section" tabIndex={-1} aria-label="Respuesta a tu consulta" className="mt-10 outline-none scroll-mt-6">
        <AnalysisResults key={analysisResult.respuestaSugerida} request={analyzedRequest} result={analysisResult} onNewAnalysis={returnToForm} />
      </section>}
      {!analysisResult && !isLoading && <div className="grid sm:grid-cols-3 gap-6 mt-9 text-sm">
        <div><MessageCircle className="w-5 h-5 text-[#267B7E] mb-3" /><h2 className="font-semibold text-slate-900">Contanos con tus palabras</h2><p className="text-slate-500 mt-2 leading-relaxed">No necesitás conocer términos técnicos para pedir ayuda.</p></div>
        <div><ArrowRight className="w-5 h-5 text-[#267B7E] mb-3" /><h2 className="font-semibold text-slate-900">Un próximo paso claro</h2><p className="text-slate-500 mt-2 leading-relaxed">Recibí orientación sobre qué revisar y qué datos pueden hacer falta.</p></div>
        <div><ShieldCheck className="w-5 h-5 text-[#267B7E] mb-3" /><h2 className="font-semibold text-slate-900">Vos mantenés el control</h2><p className="text-slate-500 mt-2 leading-relaxed">La asistencia no modifica tus registros, pagos ni permisos.</p></div>
      </div>}
    </main>
    <footer className="border-t border-slate-200 bg-white"><div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500"><span className="font-semibold text-[#267B7E]">Nagora · Es momento de gestionar fácil</span><span className="flex items-center gap-2"><LifeBuoy className="w-3.5 h-3.5" />Asistencia con IA · Sin cambios automáticos en tu cuenta</span></div></footer>
  </div>;
}
