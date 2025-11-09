export interface Product {
  id: string
  name: string
  description: string | null
  price_cents: number
  image_url: string | null
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  stripe_session_id: string
  total_cents: number
  status: string
  created_at: string
}
