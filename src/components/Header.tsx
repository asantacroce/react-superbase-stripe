import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { user, signOut } = useAuth()
  const { totalItems } = useCart()

  return (
    <header className="bg-troy-dark text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-troy-yellow">⚡</span>
            <span className="text-xl font-bold">Troy Fitness</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-troy-yellow transition">
              Shop
            </Link>

            <Link to="/cart" className="relative hover:text-troy-yellow transition">
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-troy-yellow text-troy-dark rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-troy-yellow text-troy-dark hover:bg-yellow-500 px-4 py-2 rounded font-semibold transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
