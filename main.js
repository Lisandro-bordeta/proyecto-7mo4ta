import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { preferenciaMP } from './handlers/mercadoPago/preferencia.js'

serve(async (req) => {
  const url = new URL(req.url)
  if (url.pathname === '/crear-preferencia') {
    return preferenciaMP(req)
  } else {
    return new Response('Not found', { status: 404 })
  }
})