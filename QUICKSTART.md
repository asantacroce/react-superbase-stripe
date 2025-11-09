# Troy Fitness - Quick Start Guide

## 🎯 What You're Building

A complete e-commerce application with:
- Product catalog and shopping cart
- User authentication
- Secure Stripe payments
- Order management

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Create Accounts

1. **Supabase** (Free): https://supabase.com
   - Click "New Project"
   - Note your Project URL and Anon Key

2. **Stripe** (Free Test Mode): https://stripe.com
   - Go to Developers > API Keys
   - Note your Publishable Key (pk_test_...)
   - Note your Secret Key (sk_test_...)

### Step 3: Configure Environment

```bash
# Copy the example file
copy .env.example .env

# Edit .env and fill in your keys
```

Your `.env` should look like:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Step 4: Setup Database

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy entire contents of `schema.sql`
4. Paste and run it
5. ✅ You should see 3 products created

### Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 🎉

## 📝 What Works Now

- ✅ Browse products
- ✅ Add to cart
- ✅ Sign up / Login
- ⚠️ Checkout (requires Edge Functions - see below)

## 🚀 Enable Checkout (Optional for Development)

To enable full checkout with Stripe:

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Login and Link

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

Your project ref is in your Supabase project URL:
`https://YOUR_PROJECT_REF.supabase.co`

### 3. Deploy Edge Functions

```bash
supabase functions deploy create-checkout
supabase functions deploy stripe-webhook
```

### 4. Set Edge Function Secrets

Go to Supabase Dashboard > Edge Functions > Settings:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (get this in next step)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service_role_xxx (from Supabase Settings > API)
```

### 5. Configure Stripe Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. URL: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/stripe-webhook`
4. Events: Select `checkout.session.completed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add it to Supabase as `STRIPE_WEBHOOK_SECRET`

## 🧪 Testing Payments

Use Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Any future expiry and any CVC

## 📂 Project Structure Guide

```
src/
├── components/      # Reusable UI components
├── context/         # Global state (Auth, Cart)
├── pages/          # Full page components
├── lib/            # Utilities and configs
└── types/          # TypeScript definitions

supabase/
└── functions/      # Backend serverless functions
```

## 🎨 Customization Ideas

### Change Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'troy-yellow': '#facc15',  // Change this!
  'troy-dark': '#0f172a',    // And this!
}
```

### Add Products

Run in Supabase SQL Editor:
```sql
INSERT INTO products (name, description, price_cents, image_url)
VALUES 
  ('New Product', 'Description here', 2999, 'https://image-url.jpg');
```

### Change Site Name

1. Edit `index.html` - change `<title>`
2. Edit `src/components/Header.tsx` - change "Troy Fitness"
3. Edit `src/components/HeroSection.tsx` - change tagline

## 🐛 Common Issues

### "Cannot connect to Supabase"
- Check `.env` file exists and has correct values
- Restart dev server after changing `.env`

### "Products not showing"
- Run `schema.sql` in Supabase SQL Editor
- Check Supabase Dashboard > Table Editor > products

### "TypeScript errors"
- Run `npm install` again
- Restart VS Code

### "Checkout not working"
- Edge Functions must be deployed (see section above)
- Check Supabase Edge Function logs

## 📚 Learning Resources

- **React**: https://react.dev
- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs/payments/checkout
- **TailwindCSS**: https://tailwindcss.com/docs

## 🎯 Next Steps

1. **Customize the design** - Make it your own!
2. **Add more products** - Via Supabase dashboard
3. **Deploy to production** - See `DEPLOYMENT.md`
4. **Add features**:
   - Product categories
   - Search functionality
   - Order history page
   - Admin dashboard

## 💡 Tips

- Save often and commit to git
- Test in incognito/private browsing
- Use browser DevTools to debug
- Check Supabase logs for backend issues

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Supabase account created
- [ ] Stripe account created
- [ ] `.env` file configured
- [ ] Database schema run
- [ ] Dev server running
- [ ] Can see products
- [ ] Can add to cart
- [ ] Can sign up/login
- [ ] (Optional) Edge functions deployed
- [ ] (Optional) Checkout working

## 🆘 Need Help?

1. Check `README.md` for detailed docs
2. Check `DEPLOYMENT.md` for deployment help
3. Review `troy-fitness-spec.md` for requirements
4. Supabase Docs: https://supabase.com/docs
5. Stripe Docs: https://stripe.com/docs

---

**Happy Coding! 🎉**

Remember: This is YOUR project now - customize it, break it, fix it, and learn! 
