export type ERPModule =
  | 'compras'
  | 'ventas'
  | 'inventario'
  | 'finanzas'
  | 'produccion'
  | 'recursos_humanos'
  | 'otro';

export type Tone = 'profesional' | 'cercano' | 'conciliador';

export type CaseType = 'consulta' | 'incidente' | 'solicitud de mejora' | 'problema de acceso';

export type Priority = 'baja' | 'media' | 'alta';

export type WorkaroundStatus = 'si' | 'no' | 'desconocido';

export type ReferralTeam = 'soporte funcional' | 'soporte técnico' | 'seguridad' | 'responsable del proceso';

export type EmotionalTone = 'muy_enojado' | 'preocupado' | 'neutral' | 'colaborativo';

export type SpecialSituationType =
  | 'ninguna'
  | 'devolucion_dinero'
  | 'amenaza_legal'
  | 'mensaje_ambiguo'
  | 'cliente_muy_enojado';

export interface AnalysisRequest {
  descripcion: string;
  modulo: ERPModule;
  mensajeError?: string;
  usuariosAfectados?: string;
  tieneAlternativa?: WorkaroundStatus;
  tono: Tone;
  criticidad?: Priority;
}

export interface ERPAnalysisResult {
  resolucion: {
    automatica: boolean;
    motivo: string;
  };
  resumenProblema: string;
  moduloProcesoAfectados: {
    modulo: string;
    proceso: string;
    detalle: string;
  };
  tipoCaso: CaseType;
  prioridad: Priority;
  justificacionPrioridad: string;
  posiblesCausas: string[];
  informacionFaltante: {
    detectada: boolean;
    detalles: string;
    preguntasSugeridas: string[];
  };
  proximosPasos: string[];
  equipoDerivacion: {
    equipo: ReferralTeam;
    justificacion: string;
  };
  intervencionEspecializada: {
    requerida: boolean;
    motivo: string;
  };
  respuestaSugerida: string;

  // Nagora Enhancements: Emotional analysis & Governance guardrails
  analisisEmocional: {
    estado: EmotionalTone;
    descripcion: string;
    protocoloDesescalada: string;
  };
  situacionEspecial: {
    tipo: SpecialSituationType;
    detectada: boolean;
    alerta: string;
    accionRecomendada: string;
  };
  decisionesHumanasRequeridas: string[];
  politicaComercialAdvertencia?: string;
}

export interface ExampleCase {
  id: string;
  titulo: string;
  subtitulo: string;
  icono: string;
  badge?: string;
  data: AnalysisRequest;
}
