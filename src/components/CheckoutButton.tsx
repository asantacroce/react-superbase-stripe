import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabaseClient'

export default function CheckoutButton() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, totalCents, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (items.length === 0) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Call Supabase Edge Function to create Stripe checkout session
      const { data, error: functionError } = await supabase.functions.invoke(
        'create-checkout',
        {
          body: {
            cartItems: items.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              price_cents: item.product.price_cents,
              qty: item.quantity,
            })),
            userId: user.id,
            success_url: `${window.location.origin}/react-superbase-stripe/success`,
            cancel_url: `${window.location.origin}/react-superbase-stripe/cart`,
          },
        }
      )

      if (functionError) {
        throw functionError
      }

      if (data?.url) {
        // Clear cart before redirecting
        clearCart()
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Failed to create checkout session')
    } finally {
      setLoading(false)
    }
  }

  const totalGBP = (totalCents / 100).toFixed(2)

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition ${
          loading || items.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-troy-yellow text-troy-dark hover:bg-yellow-500'
        }`}
      >
        {loading ? 'Processing...' : `Checkout - £${totalGBP}`}
      </button>
      
      {!user && items.length > 0 && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          Please login to complete checkout
        </p>
      )}
    </div>
  )
}
