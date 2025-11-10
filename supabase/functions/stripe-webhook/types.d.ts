// Lightweight ambient module declarations for Deno remote imports used by this function.
// These are editor-only helpers to silence TS/IDE errors. They do NOT affect runtime.

declare module 'https://deno.land/std@0.168.0/http/server.ts' {
  // Minimal typing for the serve function used in this file
  export function serve(handler: (req: Request) => Response | Promise<Response>): void
}

declare module 'https://esm.sh/stripe@12.0.0?target=deno' {
  // Stripe is imported as a default export. We'll type it as any for editor convenience.
  const Stripe: any
  export default Stripe
  export const createFetchHttpClient: any
  export const createSubtleCryptoProvider: any
}

// Minimal namespace/type declarations so code using `Stripe.<...>` types compiles in the editor.
declare namespace Stripe {
  namespace Checkout {
    interface Session {
      id: string
      metadata?: { [key: string]: string } | null
      amount_total?: number | null
    }
  }

  interface Event<T = any> {
    type: string
    data: { object: T }
  }
}

declare module 'https://esm.sh/@supabase/supabase-js@2.39.0' {
  // We only use createClient(...) from supabase-js in this function.
  export function createClient(url: string, key: string): any
}
