# Troy Fitness - Deployment Guide

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended)

#### Prerequisites
- GitHub repository with code pushed
- GitHub Actions enabled

#### Steps

1. **Add Secrets to GitHub Repository**
   - Go to repository **Settings** > **Secrets and variables** > **Actions**
   - Add the following secrets:
     ```
     VITE_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY
     VITE_STRIPE_PUBLIC_KEY
     ```

2. **Enable GitHub Pages**
   - Go to **Settings** > **Pages**
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)

3. **Push to Main Branch**
   ```bash
   git push origin main
   ```
   
4. **Automatic Deployment**
   - GitHub Actions will build and deploy automatically
   - Check **Actions** tab to monitor progress

5. **Access Your Site**
   ```
   https://yourusername.github.io/react-superbase-stripe/
   ```

### Option 2: Manual GitHub Pages Deployment

```bash
# Install gh-pages
npm install -D gh-pages

# Create .env file with your variables
# Build the project
npm run build

# Deploy
npm run deploy
```

### Option 3: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables in Vercel Dashboard**
   - Go to project settings
   - Add all VITE_* environment variables

### Option 4: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Add Environment Variables in Netlify Dashboard**

## 🔧 Supabase Edge Functions Deployment

### Prerequisites
- Supabase CLI installed: `npm install -g supabase`
- Supabase project created

### Steps

1. **Login to Supabase**
   ```bash
   supabase login
   ```

2. **Link Your Project**
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

3. **Deploy Functions**
   ```bash
   supabase functions deploy create-checkout
   supabase functions deploy stripe-webhook
   ```

4. **Set Environment Variables**
   
   Go to Supabase Dashboard > Edge Functions > Settings:
   ```
   STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
   STRIPE_WEBHOOK_SECRET=whsec_...
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. **Test Functions**
   ```bash
   # Test create-checkout
   curl -X POST https://your-project.supabase.co/functions/v1/create-checkout \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -d '{"cartItems":[],"userId":"test","success_url":"https://example.com","cancel_url":"https://example.com"}'
   ```

## 🔗 Stripe Webhook Configuration

### For Production

1. **Get Your Edge Function URL**
   ```
   https://your-project.supabase.co/functions/v1/stripe-webhook
   ```

2. **Configure in Stripe Dashboard**
   - Go to **Developers** > **Webhooks**
   - Click **Add endpoint**
   - Paste your Edge Function URL
   - Select events: `checkout.session.completed`
   - Copy the **Signing secret**

3. **Update Supabase Environment**
   - Add `STRIPE_WEBHOOK_SECRET=whsec_...` to Edge Functions

### Testing Webhooks Locally

```bash
# Install Stripe CLI
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook

# Use the webhook secret provided by the CLI
```

## ✅ Pre-Deployment Checklist

### Frontend
- [ ] All environment variables configured
- [ ] Build succeeds locally: `npm run build`
- [ ] Test in preview: `npm run preview`
- [ ] Update `vite.config.ts` base path if needed
- [ ] Verify all API endpoints point to production

### Backend
- [ ] Database schema deployed (run `schema.sql`)
- [ ] RLS policies enabled and tested
- [ ] Edge Functions deployed
- [ ] Environment variables set in Supabase
- [ ] Test functions with production data

### Stripe
- [ ] Webhook endpoint configured
- [ ] Using production keys (sk_live_*, pk_live_*)
- [ ] Webhook secret updated
- [ ] Test checkout flow end-to-end

### Database
- [ ] Products seeded
- [ ] RLS policies tested
- [ ] Backup strategy in place

## 🔄 Continuous Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the app on push to main
2. Injects environment variables
3. Deploys to GitHub Pages

## 🐛 Troubleshooting Deployment

### Issue: 404 on GitHub Pages
**Solution**: Check `vite.config.ts` has correct `base` path:
```typescript
base: '/react-superbase-stripe/',
```

### Issue: Environment variables not working
**Solution**: Ensure all VITE_* variables are:
1. In `.env` for local dev
2. In GitHub Secrets for Actions
3. In hosting provider dashboard

### Issue: Stripe checkout fails in production
**Solution**: 
1. Verify production Stripe keys
2. Check Edge Function is deployed
3. Confirm webhook is receiving events

### Issue: CORS errors
**Solution**: Supabase Edge Functions include CORS headers. Verify:
1. Correct Supabase URL in environment
2. Anon key is valid
3. Functions are deployed

## 📊 Monitoring

### Supabase Dashboard
- Monitor Edge Function logs
- Check database queries
- Review auth activity

### Stripe Dashboard
- View successful payments
- Check webhook events
- Monitor failed transactions

## 🔐 Security Checklist

- [ ] Never commit `.env` file
- [ ] Use environment variables for all secrets
- [ ] Enable RLS on all Supabase tables
- [ ] Use HTTPS only in production
- [ ] Validate webhook signatures
- [ ] Use Stripe production keys securely
- [ ] Set up proper CORS policies

## 📈 Going Live

1. **Switch to Production Keys**
   - Stripe: sk_live_* and pk_live_*
   - Test full checkout flow

2. **Update Domain (if custom)**
   - Configure in hosting provider
   - Update Stripe webhook URL
   - Update CORS settings

3. **Monitor First Transactions**
   - Watch Stripe dashboard
   - Check Edge Function logs
   - Verify orders in database

4. **Announce Launch** 🎉
