export function acceptsLimitation(value: string): boolean {
  return value.trim().length >= 20 && /(atrito|desn[ií]vel|resolu[çc]|sensor|medi[çc]|erro de zero|alinhamento|cron[oô]metro|poucos dados|quantidade de|n[uú]mero de)/i.test(value);
}

// Checks structural cues only. The instructor evaluates the scientific argument.
export function acceptsCER(value: string): boolean {
  return value.trim().length >= 70
    && /(MRU|movimento retil[ií]neo uniforme)/i.test(value)
    && /(1[,.]03\s*m\s*\/\s*s|0[,.]9945)/i.test(value)
    && /(porque|pois|uma vez que|portanto|assim|j[aá] que)/i.test(value)
    && /(linear|inclina[çc]|velocidade constante)/i.test(value);
}

export const SESSION_PREFIX = 'labmotion-v2:';
export function validSavedValue(key: string, value: unknown, fallback: unknown): boolean {
  if (key === 'phase') return ['intro','briefing','pretest','map','mission','debrief','posttest','results'].includes(String(value));
  if (typeof fallback === 'number') {
    const maximum = key === 'missionIndex' ? 4 : key === 'questionIndex' ? 3 : key === 'recovered' ? 5 : 265;
    return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= maximum;
  }
  if (Array.isArray(fallback)) return Array.isArray(value) && value.length === fallback.length && value.every((item, i) => typeof item === typeof fallback[i] && (typeof item !== 'number' || (Number.isInteger(item) && item >= -1 && item <= 3)));
  if (key === 'selected') return value === null || (Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 3);
  if (key === 'result') return value === null || value === 'correct' || value === 'wrong';
  return typeof value === typeof fallback;
}
