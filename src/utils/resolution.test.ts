import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { ERPAnalysisResult } from '../types/erp';
import { determineResolution } from './resolution';

const base = {
  tipoCaso: 'consulta', prioridad: 'baja',
  informacionFaltante: { detectada: false },
  situacionEspecial: { detectada: false },
  intervencionEspecializada: { requerida: false },
  decisionesHumanasRequeridas: [],
} as unknown as Omit<ERPAnalysisResult, 'resolucion'>;

test('una consulta informativa suficiente puede resolverse automáticamente', () => {
  assert.equal(determineResolution(base).automatica, true);
});

test('no confunde ausencia de especialista con resolución automática', () => {
  assert.equal(determineResolution({ ...base, tipoCaso: 'incidente' }).automatica, false);
});

test('información faltante, situaciones especiales y decisiones sensibles requieren revisión', () => {
  const variants = [
    { ...base, informacionFaltante: { ...base.informacionFaltante, detectada: true } },
    { ...base, situacionEspecial: { ...base.situacionEspecial, detectada: true } },
    { ...base, intervencionEspecializada: { ...base.intervencionEspecializada, requerida: true } },
    { ...base, decisionesHumanasRequeridas: ['Autorizar una devolución'] },
    { ...base, prioridad: 'alta' as const },
    { ...base, tipoCaso: 'problema de acceso' as const },
  ];
  for (const result of variants) assert.equal(determineResolution(result).automatica, false);
});
