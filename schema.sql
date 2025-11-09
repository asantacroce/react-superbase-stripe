-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed products
INSERT INTO products (name, description, price_cents, image_url) VALUES
  ('Protein Shake', 'Premium protein shake for optimal recovery and muscle growth', 1999, 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400'),
  ('Resistance Bands', 'Durable resistance bands for strength and conditioning training', 1299, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400'),
  ('Gym T-Shirt', 'Breathable training tee with Troy Fitness branding', 2499, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400')
ON CONFLICT DO NOTHING;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  stripe_session_id TEXT UNIQUE,
  total_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read)
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- RLS Policies for orders (users can only see their own)
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
