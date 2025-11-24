# Quick Start Guide

## Running the App Locally

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# App will open at http://localhost:3000
```

## Demo User Credentials

**Already logged in as:**
- Name: Kyle Stephens
- Points: 750 / 1000
- Free Drinks: 1 available

## Demo Payment Details

**Use these at checkout:**
- Card: `4242 4242 4242 4242`
- Expiry: `12/28`
- CVV: `123`
- ZIP: `77304`

## Quick Test Flow (2 minutes)

1. **Home Page** → See points progress and free drink
2. **Click "Order Now"** → Browse menu
3. **Select "Blondie"** → Customize drink
4. **Add to Cart** → Review order
5. **Checkout** → Use free drink toggle
6. **Place Order** → See success animation
7. **Check Rewards** → Points updated
8. **View Orders** → Order history

## Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or push to GitHub and deploy via Vercel dashboard
```

## Key Features to Demo

✅ Native app feel with smooth animations
✅ 20,000+ drink customization combinations
✅ Complete rewards system (100 pts/drink)
✅ Free drink redemption at checkout
✅ Order history with reorder button
✅ Favorite drinks system
✅ Location finder with directions
✅ Bottom navigation (mobile standard)

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or specify different port
npm run dev -- --port 3001
```

**Clear browser storage:**
- Open DevTools (F12)
- Application → Local Storage
- Right-click → Clear

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
src/
├── pages/          # 9 main screens
├── components/     # Reusable UI components
├── stores/         # State management (Zustand)
├── data/           # Mock menu & location data
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

## Tech Stack

- **React 18** + TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state
- **React Router** for navigation
- **Framer Motion** for animations
- **Vite** for building

## Mobile Testing

**iOS Safari:**
1. Open http://YOUR_LOCAL_IP:3000 on iPhone
2. Tap Share → Add to Home Screen
3. Opens like a native app

**Android Chrome:**
1. Open the app URL
2. Menu → Install app
3. Launches fullscreen

**Get your local IP:**
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

## Next Steps

1. ✅ App is running locally
2. ⏭️ Test on mobile device
3. ⏭️ Deploy to Vercel for demo link
4. ⏭️ Share with stakeholders

## Support

Questions? Contact Kyle Stephens
- 📧 leads@stephenscode.dev
- 📱 (936) 323-4527

---

**You're all set! The app is ready to demo.** 🎉
