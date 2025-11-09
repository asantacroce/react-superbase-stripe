import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Success() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <span className="text-6xl">✅</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase, {user?.email}!
          </p>
          
          <div className="bg-troy-dark text-white p-6 rounded-lg mb-6">
            <p className="mb-2">Your order has been confirmed and is being processed.</p>
            <p className="text-sm text-gray-300">
              You will receive a confirmation email shortly.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="block bg-troy-yellow text-troy-dark px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition"
            >
              Continue Shopping
            </Link>
            
            <p className="text-sm text-gray-600">
              Questions? Contact us at support@troyfitness.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
