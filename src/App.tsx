import React, { useState, useEffect } from 'react';
import {
  AnalysisRequest,
  ERPAnalysisResult,
  ExampleCase,
} from './types/erp';
import { Header } from './components/Header';
import { CaseForm } from './components/CaseForm';
import { AnalysisResults } from './components/AnalysisResults';
import { NagoraProtocolModal } from './components/NagoraProtocolModal';
import {
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Shield,
  FileCheck,
  CheckCircle,
  HeartHandshake,
  BookOpen,
} from 'lucide-react';

const INITIAL_FORM: AnalysisRequest = {
  descripcion: '',
  modulo: 'otro',
  mensajeError: '',
  usuariosAfectados: '',
  tieneAlternativa: 'desconocido',
  tono: 'cercano',
};

export default function App() {
  const [formData, setFormData] = useState<AnalysisRequest>(INITIAL_FORM);
  const [analysisResult, setAnalysisResult] = useState<ERPAnalysisResult | null>(null);
  const [analyzedRequest, setAnalyzedRequest] = useState<AnalysisRequest>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Check API status on mount
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.configured === 'boolean') {
          setApiConfigured(data.configured);
        }
      })
      .catch(() => {
        setApiConfigured(true);
      });
  }, []);

  const handleFormChange = (updates: Partial<AnalysisRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    if (updates.descripcion !== undefined && updates.descripcion.trim().length > 0) {
      setValidationError(null);
    }
  };

  const handleLoadExample = (example: ExampleCase) => {
    setFormData({ ...example.data });
    setValidationError(null);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setFormData(INITIAL_FORM);
    setAnalysisResult(null);
    setErrorMessage(null);
    setValidationError(null);
  };

  const handleAnalyze = async () => {
    // Validation: Description cannot be empty or only spaces
    if (!formData.descripcion || formData.descripcion.trim().length === 0) {
      setValidationError(
        'Por favor, ingresá una descripción o mensaje antes de analizar el caso.'
      );
      return;
    }

    setValidationError(null);
    setErrorMessage(null);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze', {
        signal: AbortSignal.timeout(50000),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'GEMINI_NOT_CONFIGURED') {
          setErrorMessage(
            'La clave GEMINI_API_KEY no se encuentra configurada en el servidor. Verificá que la variable de entorno o Secreto esté presente para habilitar el análisis de IA.'
          );
        } else {
          setErrorMessage(
            data.message || 'Ocurrió un error inesperado al procesar el caso con la IA.'
          );
        }
        return;
      }

      if (data.success && data.data) {
        setAnalyzedRequest({ ...formData });
        setAnalysisResult(data.data);
        setTimeout(() => {
          const resultsEl = document.getElementById('analysis-results-section');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        setErrorMessage(
          'La respuesta devuelta por el servidor no tiene el formato esperado.'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError')
        ? 'El análisis tardó demasiado. Tu mensaje sigue en el formulario; podés reintentarlo'
        : err instanceof Error ? err.message : 'Error de conexión con el servidor';
      setErrorMessage(
        `No fue posible comunicarse con el servicio de análisis (${msg}). Por favor, revisá tu conexión e intentá de nuevo.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-slate-800 flex flex-col font-sans selection:bg-[#8ADCAE]/30 selection:text-[#267B7E]">
      <Header
        apiConfigured={apiConfigured}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* API key missing banner if detected */}
        {apiConfigured === false && (
          <div className="p-5 rounded-3xl bg-[#F08A78]/15 border-2 border-[#F08A78]/40 text-[#9E3926] flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-[#F08A78] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#9E3926]">
                Aviso: Gemini API Key no configurada
              </h3>
              <p className="text-xs text-slate-700 mt-1">
                La aplicación necesita la variable de entorno <code className="bg-white/70 px-1.5 py-0.5 rounded font-mono text-[#267B7E]">GEMINI_API_KEY</code> para procesar casos reales. No mostramos datos simulados ficticios.
              </p>
            </div>
          </div>
        )}

        {/* Error notification banner with retry */}
        {errorMessage && (
          <div className="p-5 rounded-3xl bg-[#F08A78]/15 border-2 border-[#F08A78]/50 text-[#9E3926] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#F08A78] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#9E3926]">
                  No pudimos completar el análisis en este momento
                </h4>
                <p className="text-xs text-slate-700 mt-1">
                  {errorMessage}
                </p>
                <p className="text-[11px] text-[#267B7E] font-medium mt-1">
                  Tu mensaje sigue guardado en el formulario para que no tengas que escribirlo de nuevo.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-2xl bg-[#3A9898] hover:bg-[#267B7E] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reintentar análisis</span>
            </button>
          </div>
        )}

        {/* Section 1: Intake Form */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-2xl bg-[#3A9898] text-white text-xs font-extrabold flex items-center justify-center shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Carga del caso o mensaje
                </h2>
                <p className="text-xs text-slate-500">
                  Hacé evidente el problema sin tecnicismos
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="text-xs text-[#267B7E] hover:text-[#3A9898] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver criterios de resolución Nagora</span>
            </button>
          </div>

          <CaseForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleAnalyze}
            onClear={handleClear}
            onLoadExample={handleLoadExample}
            isLoading={isLoading}
            validationError={validationError}
          />
        </section>

        {/* Section 2: Results Section */}
        {analysisResult && (
          <section id="analysis-results-section" className="space-y-4 pt-6 border-t border-[#267B7E]/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-2xl bg-[#8ADCAE] text-[#267B7E] text-xs font-extrabold flex items-center justify-center shadow-xs">
                  2
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Diagnóstico, pasos seguros y respuesta sugerida
                  </h2>
                  <p className="text-xs text-slate-500">
                    Diseñado para que pienses: "Lo entiendo. Puedo hacerlo."
                  </p>
                </div>
              </div>
            </div>

            <AnalysisResults
              request={analyzedRequest}
              result={analysisResult}
              onNewAnalysis={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </section>
        )}

        {/* Nagora Values Informative Cards */}
        {!analysisResult && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#267B7E]/15">
            <div className="p-5 rounded-3xl bg-white border border-[#267B7E]/15 shadow-2xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-[#8ADCAE]/25 text-[#267B7E] shrink-0">
                <HeartHandshake className="w-5 h-5 text-[#3A9898]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Empatía y Calma
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Si un cliente está enojado o angustiado, la prioridad es desescalar el conflicto con cercanía humana, sin respuestas frías ni defensivas.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#267B7E]/15 shadow-2xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-[#3A9898]/15 text-[#267B7E] shrink-0">
                <Shield className="w-5 h-5 text-[#3A9898]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Límites de la IA
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  La IA jamás aprueba devoluciones de dinero, anulaciones contables ni acuerdos legales. Esas decisiones quedan reservadas a personas autorizadas.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#267B7E]/15 shadow-2xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-[#8ADCAE]/25 text-[#267B7E] shrink-0">
                <CheckCircle className="w-5 h-5 text-[#267B7E]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Pasos Seguros
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Orientado a verificaciones seguras de solo lectura para ordenar el stock, las ventas o los comprobantes sin poner en riesgo tu negocio.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#267B7E]/15 bg-white py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#267B7E]">Nagora</span>
            <span>— Es momento de gestionar fácil</span>
          </div>
          <span className="text-slate-400">Datos protegidos en memoria • Sin modificaciones directas al ERP</span>
        </div>
      </footer>

      {/* Modal with the 6 Resolution Criteria */}
      <NagoraProtocolModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
