import React from 'react'
import { CartItem } from '../types'

interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export default function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const { product, quantity } = item
  const priceGBP = (product.price_cents / 100).toFixed(2)
  const totalGBP = ((product.price_cents * quantity) / 100).toFixed(2)

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
      <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="flex-grow">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600">£{priceGBP} each</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="w-12 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg text-troy-yellow">£{totalGBP}</p>
        <button
          onClick={() => onRemove(product.id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
