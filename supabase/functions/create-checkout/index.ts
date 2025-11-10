import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Log incoming request metadata for debugging
    try {
      console.log('Incoming request', { method: req.method, headers: Object.fromEntries(req.headers) })
    } catch (e) {
      console.log('Could not stringify headers', e)
    }

    const { cartItems, userId, success_url, cancel_url } = await req.json()
    console.log('create-checkout payload', { cartItems, userId, success_url, cancel_url })

    // Create line items for Stripe
    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price_cents,
      },
      quantity: item.qty,
    }))

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url,
      cancel_url,
      metadata: {
        user_id: userId,
      },
    })

    console.log('Stripe session created', { id: session.id, url: session.url })

    const responsePayload = { url: session.url }
    console.log('create-checkout response', responsePayload)
    return new Response(
      JSON.stringify(responsePayload),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 200,
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 400,
      }
    )
  }
})
