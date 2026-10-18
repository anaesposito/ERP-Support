import type { ERPAnalysisResult } from '../types/erp';

export function determineResolution(result: Omit<ERPAnalysisResult, 'resolucion'>): ERPAnalysisResult['resolucion'] {
  if (result.informacionFaltante.detectada) {
    return { automatica: false, motivo: 'Necesitamos más información para orientarte con precisión. Completá los datos indicados antes de dar el problema por resuelto.' };
  }
  if (result.situacionEspecial.detectada || result.intervencionEspecializada.requerida || result.decisionesHumanasRequeridas.length > 0) {
    return { automatica: false, motivo: 'Tu consulta incluye decisiones que necesitan la revisión del equipo responsable. La asistencia automática no puede autorizarlas.' };
  }
  if (result.tipoCaso === 'consulta' && result.prioridad === 'baja') {
    return { automatica: true, motivo: 'La información que compartiste permite darte una respuesta orientativa sin modificar tus datos. Si la respuesta no alcanza para resolver tu duda, podés ampliar la consulta.' };
  }
  return { automatica: false, motivo: 'Te recomendamos que el equipo de soporte verifique lo que ocurre y confirme la solución. Mientras tanto, podés seguir los pasos de orientación indicados.' };
}
