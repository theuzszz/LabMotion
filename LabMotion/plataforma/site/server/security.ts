export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status=status; }
}
export const now = () => new Date().toISOString();
export const id = () => crypto.randomUUID();
export function code(bytes = 20) {
  // 40 uniformly sampled symbols give >190 bits; alphabet excludes I/L/O/0/1.
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const limit = Math.floor(256 / alphabet.length) * alphabet.length;
  let out = '';
  while (out.length < bytes * 2) {
    for (const x of crypto.getRandomValues(new Uint8Array(64))) {
      if (x < limit) out += alphabet[x % alphabet.length];
      if (out.length === bytes * 2) break;
    }
  }
  return out.match(/.{1,5}/g)!.join('-');
}
export const normalizeCode = (s: string) => s.toUpperCase().replace(/[\s-]/g, '');
export async function hash(s: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(digest), x => x.toString(16).padStart(2,'0')).join('');
}
export function str(value: unknown, name: string, min = 1, max = 5000) {
  if (typeof value !== 'string' || value.trim().length < min || value.length > max) throw new ApiError(400, `${name}: conteúdo inválido.`);
  return value.trim();
}
export function integer(value: unknown, min: number, max: number) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max) throw new ApiError(400, 'Número fora do intervalo permitido.');
  return value;
}
export function nickname(value: unknown) { return str(value,'Apelido',2,40); }
export function eventKey(value: unknown) {
  const k = str(value,'Identificador da operação',16,80);
  if (!/^[a-zA-Z0-9_-]+$/.test(k)) throw new ApiError(400,'Identificador da operação inválido.');
  return k;
}
export function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value !== null && typeof value === 'object') return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${stable((value as Record<string,unknown>)[k])}`).join(',')}}`;
  return JSON.stringify(value);
}
export function csv(rows: Record<string,unknown>[]) {
  const keys = [...new Set(rows.flatMap(Object.keys))];
  const cell = (x: unknown) => {
    let v = x === null || x === undefined ? '' : typeof x === 'object' ? JSON.stringify(x) : String(x);
    if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
    return `"${v.replaceAll('"','""')}"`;
  };
  return '\uFEFF' + [keys.map(cell).join(';'), ...rows.map(r=>keys.map(k=>cell(r[k])).join(';'))].join('\r\n');
}
export function cookie(request: Request, name: string) {
  const pair = request.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='));
  return pair ? decodeURIComponent(pair.slice(name.length+1)) : null;
}
export function sessionCookie(request: Request, token: string, seconds = 43200) {
  return `lm_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${seconds}${new URL(request.url).protocol === 'https:' ? '; Secure' : ''}`;
}
export function checkOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new ApiError(403,'Origem não autorizada.');
  if (request.headers.get('sec-fetch-site') === 'cross-site') throw new ApiError(403,'Origem não autorizada.');
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new ApiError(415,'Envie JSON.');
}
