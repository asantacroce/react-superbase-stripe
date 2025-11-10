import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

// Deno runtime globals (this file runs on Supabase Edge / Deno)
declare const Deno: any

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

// Supabase Functions provide parameters with a PAR_ prefix. Use those here.
const supabaseUrl = Deno.env.get('PAR_SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('PAR_SUPABASE_SERVICE_ROLE_KEY') || ''
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables: PAR_SUPABASE_URL or PAR_SUPABASE_SERVICE_ROLE_KEY')
} else {
  console.log('Using Supabase env vars with prefix: PAR_')
}
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req: Request) => {
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    // Log incoming request metadata
    try {
      console.log('Incoming webhook request', { method: req.method, headers: Object.fromEntries(req.headers) })
    } catch (e) {
      console.log('Could not stringify headers', e)
    }

    // Read the raw request body as text (Stripe signature verification requires the raw payload)
    const body = await req.text()
    console.log('Webhook raw body:', body)
    console.log('Webhook stripe-signature header:', signature)

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''

    if (!webhookSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET environment variable')
      return new Response('Webhook secret not configured', { status: 500 })
    }

    // Verify webhook signature
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider()
    )

    console.log('Webhook verified event:', event)

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Insert order into database
      const insertPayload = {
        user_id: session.metadata?.user_id,
        stripe_session_id: session.id,
        total_cents: session.amount_total,
        status: 'paid',
      }
      console.log('Inserting order into DB:', insertPayload)
      const { data: insertData, error } = await supabase.from('orders').insert(insertPayload).select()

      if (error) {
        console.error('Error inserting order:', error)
        throw error
      }

      console.log('Order created successfully for session:', session.id, 'inserted:', insertData)
    }

    const respPayload = { received: true }
    console.log('Webhook response payload:', respPayload)
    return new Response(JSON.stringify(respPayload), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
