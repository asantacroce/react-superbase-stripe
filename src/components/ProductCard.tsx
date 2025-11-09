import React from 'react'
import { Product } from '../types'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const priceGBP = (product.price_cents / 100).toFixed(2)

  const handleAddToCart = () => {
    addItem(product, 1)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-troy-yellow">£{priceGBP}</span>
          
          <button
            onClick={handleAddToCart}
            className="bg-troy-dark text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
