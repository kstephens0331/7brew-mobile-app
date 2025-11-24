# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 7 Brew mobile app demo"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Done! Your app will be live at `your-app.vercel.app`

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Build the App Locally

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist` folder.

## Environment Variables

This demo doesn't require any environment variables. All data is mocked for demonstration purposes.

## Post-Deployment Checklist

- [ ] Test all pages on mobile device
- [ ] Verify cart persistence
- [ ] Test checkout flow with demo payment
- [ ] Check rewards system calculations
- [ ] Verify navigation works correctly
- [ ] Test on both iOS and Android devices
- [ ] Check responsive design on different screen sizes

## Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Tips

The app is already optimized with:
- Code splitting via React Router
- Lazy loading of components
- Optimized images (if added)
- Minimal bundle size with Vite
- Persistent state with Zustand

## Monitoring

Use Vercel Analytics (free) to monitor:
- Page views
- Performance metrics
- User engagement

Enable in Vercel dashboard: Settings → Analytics

## Troubleshooting

### Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: Should be 16+
- Review build logs in Vercel dashboard

### Routing Issues
- Ensure `vercel.json` is present
- Check that all routes are defined in App.tsx

### Mobile Issues
- Test viewport meta tags
- Check touch target sizes (minimum 44x44px)
- Verify safe area insets for iOS notch

## Demo Features Note

Remember to explain to viewers that:
- Payment processing is simulated (no real charges)
- User data is stored in browser localStorage
- No backend or API required
- Perfect for demonstrations and portfolio

## Next Steps for Production

If converting to a real app:
1. Set up backend API (Node.js, Django, etc.)
2. Integrate real payment processor (Stripe, Square)
3. Connect to database (PostgreSQL, MongoDB)
4. Add authentication (Auth0, Firebase)
5. Implement push notifications
6. Add real-time order tracking
7. Connect to actual POS system

---

**Questions?**
Contact: Kyle Stephens
- Email: leads@stephenscode.dev
- Phone: (936) 323-4527
