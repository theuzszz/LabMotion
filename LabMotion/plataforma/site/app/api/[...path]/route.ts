import { env } from 'cloudflare:workers';
import { handleApi } from '../../../server/api';
import type { Settings } from '../../../server/auth';
export const dynamic = 'force-dynamic';
async function handle(request: Request) {
  if (!env.DB) return Response.json({error:'Banco da prévia indisponível.'},{status:503});
  return handleApi(request,env.DB,env as Settings);
}
export const GET=handle;
export const POST=handle;
