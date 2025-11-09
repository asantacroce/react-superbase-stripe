# 🏋️‍♂️ Troy Fitness — Technical Specification

## 1. Overview
**Troy Fitness** is a small-scale e-commerce web application for a football fitness trainer. The goal is to showcase and sell Troy’s branded training gear (e.g., T-shirts, bands, shakes) through a simple online shop.

**Architecture**
- **Frontend:** Vite + React + TypeScript + TailwindCSS (hosted on GitHub Pages)
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **Payments:** Stripe (GBP)
- **Cart:** Local React state
- **Auth:** Supabase Auth

---

## 2. Functional Requirements

### 2.1 Authentication
- Email/password sign-up & login via Supabase Auth.
- Session persisted client-side.
- Auth context provided globally.
- Only logged-in users can access checkout.

### 2.2 Product Catalog
Supabase table `products`:

| Field | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | Product name |
| description | text | Optional |
| price_cents | int | Price in pence |
| image_url | text | Image link |

Seed data:
1. Protein Shake – £19.99  
2. Resistance Bands – £12.99  
3. Gym T-Shirt – £24.99  

Products are fetched via Supabase JS SDK.

### 2.3 Shopping Cart
- React Context for cart state.
- Add/remove/update quantity, subtotal, and total.
- Stored locally (not DB).
- Checkout enabled only when logged in and cart non-empty.

### 2.4 Checkout and Orders
Flow:
1. User clicks Checkout.
2. Frontend calls Supabase Edge Function `create-checkout`.
3. Function creates Stripe Checkout Session (GBP).
4. Stripe handles payment and redirects to success or cancel page.
5. Supabase Edge Function `stripe-webhook` handles webhook event and updates Supabase `orders` table.

`orders` table:

| Field | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| user_id | uuid | FK → auth.users |
| stripe_session_id | text | Stripe session reference |
| total_cents | int | Amount paid |
| status | text | default 'pending' |
| created_at | timestamp | default now() |

### 2.5 Landing Page / UI
- Hero section with dark sporty background, dummy logo, and tagline:
  “Train hard. Play harder. Troy Fitness — elite football conditioning.”
- Call-to-action scrolls to product grid.
- Responsive Tailwind layout.
- Cart icon with item count.
- Color palette: dark gray/black background, yellow accent (#facc15).

### 2.6 Success & Login Pages
- Success page: confirmation after Stripe redirect.
- Login page: email/password auth form using Supabase.

---

## 3. Non-Functional Requirements

| Category | Specification |
|-----------|----------------|
| Architecture | SPA + Serverless |
| Scalability | Auto-scales via Supabase |
| Security | Stripe handles payments; secrets in Supabase env vars |
| Hosting | Frontend on GitHub Pages; backend on Supabase |
| Performance | Lightweight Vite build |
| Maintainability | TypeScript, modular code |
| Reliability | Stripe webhooks ensure order recording |
| Usability | Mobile-first UI |
| Extensibility | Future training booking or subscriptions |

---

## 4. System Components

### 4.1 Frontend (React App)
**Stack**
- React 18 + TypeScript  
- TailwindCSS  
- Vite  
- Supabase JS SDK  
- Stripe.js  

**Structure**
```
src/
├── components/
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── Cart.tsx
│   └── CheckoutButton.tsx
├── context/
│   └── CartContext.tsx
├── pages/
│   ├── Home.tsx
│   ├── CartPage.tsx
│   ├── Success.tsx
│   └── Login.tsx
├── lib/
│   ├── supabaseClient.ts
│   └── config.ts
└── main.tsx / App.tsx
```

---

### 4.2 Backend (Supabase Edge Functions)

**Function: `create-checkout`**
- Input: `{ cartItems, userId }`
- Creates Stripe Checkout Session
- Returns `{ url }`

**Function: `stripe-webhook`**
- Listens for `checkout.session.completed`
- Inserts record into `orders`

**Environment Variables**
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service_role_...
```

---

### 4.3 Database Schema
Tables: `products`, `orders`  
Optional: `carts`, `cart_items` if future persistence needed.

RLS policy: `auth.uid() = user_id` on orders.

---

### 4.4 Deployment Workflow

**Supabase**
```
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```
Set environment variables in Supabase dashboard.

**Stripe**
```
stripe webhook create   --url https://<project>.functions.supabase.co/stripe-webhook   --events checkout.session.completed
```

**Frontend**
```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
VITE_STRIPE_PUBLIC_KEY=pk_test_...
npm run build
npm run deploy
```

---

## 5. Future Enhancements
- Persist cart in Supabase.  
- Add training session booking feature.  
- Integrate Stripe subscriptions.  
- Include analytics dashboard for Troy.  
- Add CMS integration (e.g., Supabase storage for blog or media).

---

## 6. Deliverables

| Item | Description |
|------|--------------|
| `frontend/` | React + Vite + Tailwind app |
| `supabase-functions/` | Edge Functions for Stripe |
| `schema.sql` | Tables + dummy products |
| `.env.example` | Placeholder for config |
| `README.md` | Complete setup and deployment instructions |
