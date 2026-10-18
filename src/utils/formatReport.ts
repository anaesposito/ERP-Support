import { AnalysisRequest, ERPAnalysisResult } from '../types/erp';

export function formatFullAnalysisAsMarkdown(
  request: AnalysisRequest,
  result: ERPAnalysisResult
): string {
  const dateStr = new Date().toLocaleString('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return `=====================================================
INFORME DE ANÁLISIS DE CASO ERP — NAGORA
"Es momento de gestionar fácil"
Fecha: ${dateStr}
=====================================================

1. RESUMEN DEL PROBLEMA:
${result.resumenProblema}

RESOLUCIÓN DEL CASO:
${result.resolucion.automatica ? 'Puede resolverse automáticamente' : 'Requiere revisión humana'}
${result.resolucion.motivo}

-----------------------------------------------------
2. MÓDULO Y PROCESO AFECTADOS:
- Módulo: ${result.moduloProcesoAfectados.modulo}
- Proceso: ${result.moduloProcesoAfectados.proceso}
- Detalle de afectación: ${result.moduloProcesoAfectados.detalle}

-----------------------------------------------------
3. TIPO DE CASO (ITIL):
${result.tipoCaso.toUpperCase()}

-----------------------------------------------------
4. PRIORIDAD Y JUSTIFICACIÓN:
- Nivel de prioridad: ${result.prioridad.toUpperCase()}
- Justificación: ${result.justificacionPrioridad}

-----------------------------------------------------
ESTADO EMOCIONAL Y DESESCALADA:
- Estado del solicitante: ${result.analisisEmocional?.estado?.toUpperCase() || 'NEUTRAL'}
- Percepción: ${result.analisisEmocional?.descripcion || 'No evaluada'}
- Protocolo sugerido: ${result.analisisEmocional?.protocoloDesescalada || 'Mantener serenidad y trato cordial.'}

-----------------------------------------------------
SITUACIÓN ESPECIAL DETECTADA:
${
  result.situacionEspecial?.detectada
    ? `- Alerta: ${result.situacionEspecial.alerta}\n- Pauta de acción: ${result.situacionEspecial.accionRecomendada}`
    : 'No se detectaron situaciones críticas excepcionales.'
}

-----------------------------------------------------
5. POSIBLES CAUSAS (HIPÓTESIS PRELIMINARES POR VERIFICAR):
${result.posiblesCausas.map((c, i) => `  ${i + 1}. [Hipótesis] ${c}`).join('\n')}
*Nota: Ninguna causa debe considerarse un diagnóstico definitivo hasta su verificación en el sistema.

-----------------------------------------------------
6. INFORMACIÓN FALTANTE:
${
  result.informacionFaltante.detectada
    ? `- Detalle: ${result.informacionFaltante.detalles}\n- Preguntas a solicitar:\n${result.informacionFaltante.preguntasSugeridas
        .map((p, i) => `    ${i + 1}. ${p}`)
        .join('\n')}`
    : 'No se detectó información faltante crítica con los datos suministrados.'
}

-----------------------------------------------------
7. PRÓXIMOS PASOS RECOMENDADOS (SOLO LECTURA Y VERIFICACIONES SEGURAS):
${result.proximosPasos.map((paso, i) => `  ${i + 1}. ${paso}`).join('\n')}

-----------------------------------------------------
8. EQUIPO RECOMENDADO PARA DERIVACIÓN:
- Equipo: ${result.equipoDerivacion.equipo.toUpperCase()}
- Motivo: ${result.equipoDerivacion.justificacion}

-----------------------------------------------------
9. INTERVENCIÓN ESPECIALIZADA:
- ¿Requiere especialista?: ${result.intervencionEspecializada.requerida ? 'SÍ' : 'NO'}
- Justificación: ${result.intervencionEspecializada.motivo}

-----------------------------------------------------
DECISIONES QUE NO DEBE TOMAR LA IA (REQUIEREN PERSONA AUTORIZADA):
${
  result.decisionesHumanasRequeridas && result.decisionesHumanasRequeridas.length > 0
    ? result.decisionesHumanasRequeridas.map((d, i) => `  - ${d}`).join('\n')
    : 'Operación estándar sin compromisos de dinero o modificaciones críticas.'
}
${result.politicaComercialAdvertencia ? `*Aviso: ${result.politicaComercialAdvertencia}` : ''}

-----------------------------------------------------
10. RESPUESTA SUGERIDA PARA EL USUARIO (Tono: ${request.tono}):
"""
${result.respuestaSugerida}
"""

=====================================================
ADVERTENCIA OBLIGATORIA:
Recomendación generada por IA según el Manual de Marca de Nagora. Verifica el análisis con el equipo responsable antes de realizar cambios en el ERP. No se ejecutaron modificaciones en bases de datos ni transacciones.
=====================================================`;
}
