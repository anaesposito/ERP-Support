import type { ERPAnalysisResult } from '../types/erp';

export function determineResolution(result: Omit<ERPAnalysisResult, 'resolucion'>): ERPAnalysisResult['resolucion'] {
  if (result.informacionFaltante.detectada) {
    return { automatica: false, motivo: 'Falta información esencial. Una persona debe obtener las aclaraciones antes de dar el caso por resuelto.' };
  }
  if (result.situacionEspecial.detectada || result.intervencionEspecializada.requerida || result.decisionesHumanasRequeridas.length > 0) {
    return { automatica: false, motivo: 'El caso contiene una situación especial o decisiones que requieren la revisión de una persona autorizada.' };
  }
  if (result.tipoCaso === 'consulta' && result.prioridad === 'baja') {
    return { automatica: true, motivo: 'Es una consulta informativa de baja urgencia, con datos suficientes y sin decisiones reservadas a una persona. Puede atenderse con la respuesta sugerida, sin modificar el sistema.' };
  }
  return { automatica: false, motivo: 'El caso necesita que el equipo de soporte verifique el problema y confirme su resolución.' };
}
