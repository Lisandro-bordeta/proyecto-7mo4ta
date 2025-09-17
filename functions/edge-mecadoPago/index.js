import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// @deno-types="npm:@types/mercadopago"
import mercadopago from 'npm:mercadopago'

// Configura tu Access Token seguro
mercadopago.configure({
  access_token: Deno.env.get('MP_ACCESS_TOKEN') || '',
})

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { carrito, email } = await req.json()

    const items = carrito.map((item) => ({
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: item.precio,
      currency_id: 'ARS',
    }))

    const preference = {
      items,
      payer: {
        email,
      },
      back_urls: {
        success: 'https://tusitio.com/success',
        failure: 'https://tusitio.com/failure',
        pending: 'https://tusitio.com/pending',
      },
      auto_return: 'approved',
    }

    const response = await mercadopago.preferences.create(preference)

    return new Response(
      JSON.stringify({
        success: true,
        init_point: response.body.init_point,
        id: response.body.id,
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
