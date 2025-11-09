# 🏋️‍♂️ Troy Fitness - E-Commerce Application

A full-stack e-commerce web application for Troy Fitness, featuring a React frontend with Supabase backend and Stripe payments.

## 🚀 Features

- **Product Catalog**: Browse training gear (protein shakes, resistance bands, gym apparel)
- **Shopping Cart**: Add/remove items with local state management
- **Authentication**: Email/password login via Supabase Auth
- **Secure Checkout**: Stripe payment integration (GBP)
- **Responsive Design**: Mobile-first TailwindCSS styling
- **Order Management**: Track orders in Supabase database

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **TailwindCSS** for styling
- **React Router** for navigation
- **Supabase JS SDK** for backend integration
- **Stripe.js** for payment processing

### Backend
- **Supabase** (PostgreSQL + Auth + Edge Functions)
- **Stripe** payment gateway
- **Edge Functions** for serverless backend logic

## 📁 Project Structure

```
troy-fitness/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Navigation with cart counter
│   │   ├── HeroSection.tsx      # Landing page hero
│   │   ├── ProductCard.tsx      # Product display card
│   │   ├── Cart.tsx             # Cart item component
│   │   └── CheckoutButton.tsx   # Stripe checkout trigger
│   ├── context/
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── CartContext.tsx      # Shopping cart state
│   ├── pages/
│   │   ├── Home.tsx             # Main shop page
│   │   ├── CartPage.tsx         # Cart management
│   │   ├── Login.tsx            # Auth page
│   │   └── Success.tsx          # Post-payment confirmation
│   ├── lib/
│   │   ├── supabaseClient.ts    # Supabase configuration
│   │   └── config.ts            # App configuration
│   └── types/
│       └── index.ts             # TypeScript types
├── supabase/
│   └── functions/
│       ├── create-checkout/     # Stripe session creator
│       └── stripe-webhook/      # Payment webhook handler
├── schema.sql                   # Database schema
└── package.json

```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([supabase.com](https://supabase.com))
- Stripe account ([stripe.com](https://stripe.com))
- Supabase CLI (optional, for function deployment)

### 1. Clone and Install

```bash
git clone <repository-url>
cd react-superbase-stripe
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy from example
copy .env.example .env
```

Fill in your values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the contents of `schema.sql` to create tables and seed data
4. Enable Row Level Security (RLS) policies are included in the schema

### 4. Supabase Edge Functions

#### Install Supabase CLI (if not already installed)

```bash
npm install -g supabase
```

#### Login and Link Project

```bash
supabase login
supabase link --project-ref your-project-ref
```

#### Deploy Functions

```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

#### Set Environment Variables in Supabase

In your Supabase dashboard, go to **Edge Functions** > **Settings** and add:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service_role_key
```

### 5. Stripe Webhook Setup

1. Get your Supabase Edge Function URL:
   ```
   https://your-project.supabase.co/functions/v1/stripe-webhook
   ```

2. In Stripe Dashboard, go to **Developers** > **Webhooks**

3. Click **Add endpoint** and configure:
   - **Endpoint URL**: Your function URL
   - **Events**: Select `checkout.session.completed`
   - Copy the **Signing secret** and add to Supabase env vars as `STRIPE_WEBHOOK_SECRET`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚢 Deployment

### Deploy to GitHub Pages

1. Update `vite.config.ts` base path to match your repo name

2. Build and deploy:

```bash
npm run build
npm run deploy
```

### Alternative: Deploy to Vercel/Netlify

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 📋 Usage

### Shopping Flow

1. **Browse Products**: View available training gear on the home page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click cart icon in header to review items
4. **Login**: Sign in or create an account
5. **Checkout**: Click checkout button to proceed to Stripe payment
6. **Complete Payment**: Enter card details in Stripe's secure form
7. **Confirmation**: View success page after payment

### Test Card Numbers (Stripe Test Mode)

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date and any 3-digit CVC

## 🔐 Security Notes

- All environment variables with sensitive data should never be committed
- Use Stripe test keys in development
- Supabase RLS policies protect user data
- Stripe handles all payment processing securely

## 📊 Database Schema

### Products Table
```sql
- id (uuid, primary key)
- name (text)
- description (text)
- price_cents (integer)
- image_url (text)
- created_at (timestamp)
```

### Orders Table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- stripe_session_id (text, unique)
- total_cents (integer)
- status (text)
- created_at (timestamp)
```

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  'troy-yellow': '#facc15',  // Brand accent
  'troy-dark': '#0f172a',    // Dark background
}
```

### Adding Products

Insert directly into Supabase or via SQL:

```sql
INSERT INTO products (name, description, price_cents, image_url)
VALUES ('New Product', 'Description', 2999, 'https://image-url.jpg');
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Cannot connect to Supabase
- **Solution**: Verify environment variables in `.env` are correct

**Issue**: Stripe checkout not working
- **Solution**: Ensure edge function `create-checkout` is deployed and env vars are set

**Issue**: Webhook not receiving events
- **Solution**: Check webhook URL in Stripe dashboard and verify `STRIPE_WEBHOOK_SECRET`

**Issue**: TypeScript errors
- **Solution**: Run `npm install` and ensure all dependencies are installed

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

Built for Troy Fitness - Elite Football Conditioning

---

## 🚀 Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env` file with Supabase and Stripe keys
- [ ] Run `schema.sql` in Supabase SQL Editor
- [ ] Deploy Edge Functions to Supabase
- [ ] Configure Stripe webhook
- [ ] Run `npm run dev`
- [ ] Test with Stripe test cards

**Need help?** Check the [Supabase Docs](https://supabase.com/docs) or [Stripe Docs](https://stripe.com/docs)
An simple ecommerce foundation project based on React and Superbase backend with Stripe integration 
