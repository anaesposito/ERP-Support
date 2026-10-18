import React from 'react';
import {
  AnalysisRequest,
  ERPModule,
  Tone,
  WorkaroundStatus,
  ExampleCase,
} from '../types/erp';
import {
  Sparkles,
  Trash2,
  AlertCircle,
  Loader2,
  Boxes,
  FileText,
  BarChart3,
  HelpCircle,
  Layers,
  Users,
  MessageSquare,
  ShieldAlert,
  AlertOctagon,
  DollarSign,
} from 'lucide-react';
import { EXAMPLE_CASES } from '../data/examples';

interface CaseFormProps {
  formData: AnalysisRequest;
  onChange: (newData: Partial<AnalysisRequest>) => void;
  onSubmit: () => void;
  onClear: () => void;
  onLoadExample: (example: ExampleCase) => void;
  isLoading: boolean;
  validationError: string | null;
}

const MODULES: { value: ERPModule; label: string; desc: string }[] = [
  { value: 'inventario', label: 'Inventario / Stock', desc: 'Existencias, depósitos y movimientos' },
  { value: 'finanzas', label: 'Finanzas y Caja', desc: 'Facturas, cobranzas y pagos' },
  { value: 'ventas', label: 'Ventas y Clientes', desc: 'Pedidos, remitos y presupuestos' },
  { value: 'compras', label: 'Compras y Proveedores', desc: 'Órdenes de compra y recepción' },
  { value: 'produccion', label: 'Producción', desc: 'Fabricación y recetas de materiales' },
  { value: 'recursos_humanos', label: 'Equipo y Personal', desc: 'Turnos y novedades de nómina' },
  { value: 'otro', label: 'Otro / No identificado', desc: 'Consulta general o módulo mixto' },
];

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: 'cercano', label: 'Cercano (Recomendado Nagora)', desc: 'Cálido, empático y tranquilizador' },
  { value: 'sencillo', label: 'Sencillo y directo', desc: 'Claro, sin rodeos ni jerga técnica' },
  { value: 'tecnico', label: 'Técnico y analítico', desc: 'Formal para personal especializado de sistemas' },
];

export const CaseForm: React.FC<CaseFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onClear,
  onLoadExample,
  isLoading,
  validationError,
}) => {
  const getExampleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Boxes':
        return <Boxes className="w-4 h-4 text-[#3A9898]" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-[#267B7E]" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-purple-600" />;
      case 'AlertOctagon':
        return <AlertOctagon className="w-4 h-4 text-[#F08A78]" />;
      case 'HelpCircle':
        return <HelpCircle className="w-4 h-4 text-[#3A9898]" />;
      case 'DollarSign':
        return <DollarSign className="w-4 h-4 text-[#267B7E]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#3A9898]" />;
    }
  };

  const isDescriptionEmpty = !formData.descripcion || formData.descripcion.trim().length === 0;

  return (
    <div className="bg-white rounded-3xl border border-[#267B7E]/15 shadow-sm p-6 sm:p-8 space-y-7">
      {/* Examples Header & Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-[#267B7E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3A9898]" />
            Cargar un caso de prueba para probar de inmediato:
          </label>
          <span className="text-xs text-slate-400">Elegí uno para autocompletar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXAMPLE_CASES.map((example) => (
            <button
              key={example.id}
              type="button"
              onClick={() => onLoadExample(example)}
              disabled={isLoading}
              className="text-left p-3.5 rounded-2xl border border-slate-200/90 hover:border-[#3A9898] hover:bg-[#3A9898]/5 transition-all group flex flex-col justify-between disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-slate-50/50"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-white border border-slate-200/60 group-hover:bg-[#8ADCAE]/20 transition-colors shadow-2xs">
                    {getExampleIcon(example.icono)}
                  </span>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#267B7E] line-clamp-1">
                    {example.titulo}
                  </span>
                </div>
                {example.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                      example.badge === 'Alerta crítica'
                        ? 'bg-[#F08A78]/20 text-[#9E3926]'
                        : example.badge === 'Ambigüedad'
                        ? 'bg-amber-100 text-amber-800'
                        : example.badge === 'Aprobación humana'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-[#8ADCAE]/30 text-[#267B7E]'
                    }`}
                  >
                    {example.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {example.subtitulo}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6 space-y-6">
        {/* Main Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="case-description"
              className="text-sm font-bold text-slate-800 flex items-center gap-1.5"
            >
              <span>Contanos el problema o pegá el mensaje recibido</span>
              <span className="text-[#F08A78] font-bold">*</span>
            </label>
            <span className="text-xs text-slate-400">
              {formData.descripcion.length} caracteres
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2.5">
            Podés pegar el WhatsApp, correo o ticket original del cliente o describir con tus palabras qué ocurrió.
          </p>
          <textarea
            id="case-description"
            rows={5}
            value={formData.descripcion}
            onChange={(e) => onChange({ descripcion: e.target.value })}
            placeholder="Ejemplo: El cliente nos escribe muy preocupado porque al registrar la venta no le genera el comprobante de pago y le figura saldo pendiente, pero en el banco el dinero ya impactó..."
            disabled={isLoading}
            className={`w-full p-4 rounded-2xl text-sm border transition-all resize-y focus:outline-none focus:ring-3 font-normal leading-relaxed ${
              validationError && isDescriptionEmpty
                ? 'border-[#F08A78] bg-[#F08A78]/10 focus:ring-[#F08A78]/20'
                : 'border-slate-300 focus:border-[#3A9898] focus:ring-[#3A9898]/15 bg-white'
            }`}
          />
          {validationError && isDescriptionEmpty && (
            <p className="mt-2 text-xs text-[#9E3926] flex items-center gap-1.5 font-semibold">
              <AlertCircle className="w-4 h-4 text-[#F08A78]" />
              {validationError}
            </p>
          )}
        </div>

        {/* Module Selector */}
        <div>
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-[#3A9898]" />
            <span>¿En qué parte del negocio ocurre?</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {MODULES.map((mod) => {
              const selected = formData.modulo === mod.value;
              return (
                <button
                  key={mod.value}
                  type="button"
                  onClick={() => onChange({ modulo: mod.value })}
                  disabled={isLoading}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selected
                      ? 'border-[#3A9898] bg-[#3A9898]/10 text-[#267B7E] ring-2 ring-[#3A9898]/20 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{mod.label}</div>
                  <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{mod.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Context Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          {/* Mensaje de error */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span>Mensaje o cartel de error</span>
              <span className="text-[10px] font-normal text-slate-400">(Opcional)</span>
            </label>
            <input
              type="text"
              value={formData.mensajeError || ''}
              onChange={(e) => onChange({ mensajeError: e.target.value })}
              placeholder="Ej. ERR-FIN-304 o texto del cartel"
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3A9898] focus:bg-white focus:ring-2 focus:ring-[#3A9898]/15"
            />
          </div>

          {/* Cantidad de personas afectadas */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>¿A cuántas personas afecta?</span>
              <span className="text-[10px] font-normal text-slate-400">(Opcional)</span>
            </label>
            <input
              type="text"
              value={formData.usuariosAfectados || ''}
              onChange={(e) => onChange({ usuariosAfectados: e.target.value })}
              placeholder="Ej. 1 cliente, Todo el local, 3 personas..."
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3A9898] focus:bg-white focus:ring-2 focus:ring-[#3A9898]/15"
            />
          </div>

          {/* ¿Existe alternativa? */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>¿Pueden seguir operando?</span>
              <span className="text-[10px] font-normal text-slate-400">(Opcional)</span>
            </label>
            <select
              value={formData.tieneAlternativa || 'desconocido'}
              onChange={(e) => onChange({ tieneAlternativa: e.target.value as WorkaroundStatus })}
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3A9898] focus:bg-white focus:ring-2 focus:ring-[#3A9898]/15"
            >
              <option value="desconocido">No se sabe / Aún por confirmar</option>
              <option value="si">Sí, tienen una alternativa para seguir</option>
              <option value="no">No, la tarea está completamente frenada</option>
            </select>
          </div>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[#3A9898]" />
            <span>Tono para la respuesta que vamos a sugerir</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TONES.map((t) => {
              const selected = formData.tono === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => onChange({ tono: t.value })}
                  disabled={isLoading}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selected
                      ? 'border-[#3A9898] bg-[#3A9898]/10 text-[#267B7E] ring-2 ring-[#3A9898]/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{t.label}</span>
                    {selected && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8ADCAE]/40 text-[#267B7E] font-bold">
                        Elegido
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{t.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClear}
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 text-slate-500" />
            <span>Limpiar formulario</span>
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || isDescriptionEmpty}
            className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer ${
              isLoading || isDescriptionEmpty
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-[#3A9898] hover:bg-[#267B7E] text-white shadow-[#3A9898]/30 hover:shadow-lg active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Analizando con criterio Nagora...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#8ADCAE]" />
                <span>Analizar caso</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
