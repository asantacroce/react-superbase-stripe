import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItemCard from '../components/Cart'
import CheckoutButton from '../components/CheckoutButton'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalCents } = useCart()

  const totalGBP = (totalCents / 100).toFixed(2)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
          
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-gray-600 mb-6 text-lg">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block bg-troy-yellow text-troy-dark px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
              
              <div className="space-y-2 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>£{totalGBP}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="text-troy-yellow">£{totalGBP}</span>
              </div>

              <CheckoutButton />

              <Link
                to="/"
                className="block text-center mt-4 text-gray-600 hover:text-gray-800 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
