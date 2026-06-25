# Hometex ECOM — Customer Storefront

Next.js 16 customer-facing storefront for Hometex Bangladesh — a home textile retail brand. Handles product browsing, cart, wishlist, checkout, order tracking, and customer accounts.

> **Portfolio project.** `.env` credentials have been removed. Backend: [hometex-api](https://github.com/ShahriarHim/hometex-api) | Admin: [hometex-ims](https://github.com/ShahriarHim/hometex-ims)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js v4 (credentials + Google OAuth) |
| Internationalisation | next-intl |
| State | React Context + SWR |
| Realtime | Pusher |
| Payments | Custom payment gateway |

---

## Features

- **Product catalog** — category tree, filters, search, product detail with photo gallery/slider
- **Cart** — persistent server-side cart, guest + logged-in
- **Wishlist** — save products for later
- **Checkout** — address selection, delivery estimation, payment
- **Guest checkout** — no account required
- **Customer accounts** — order history, profile, address book
- **Corporate accounts** — bulk ordering, separate pricing tier
- **Google OAuth** — one-click sign-in
- **Internationalisation** — multi-locale support via next-intl
- **Dynamic shipping** — rates read from system settings API (no hardcoded values)
- **Banner sliders** — managed from IMS admin

---

## Project Structure

```
src/
  app/              # Next.js App Router pages and layouts
  components/       # Shared UI components
    layout/         # Header, Footer, Navigation
    ui/             # Buttons, Cards, Inputs, Modals
  views/            # Page-level view components
  hooks/            # Custom React hooks
  lib/              # API client, auth config, utilities
  types/            # TypeScript type definitions
messages/           # i18n translation files
public/             # Static assets
```

---

## API Integration

Consumes the Hometex Laravel API:

```
Public:     GET  /api/v1/products, /api/v1/categories, /api/v1/banners
Auth:       POST /api/v1/ecom/login, /api/v1/ecom/register
Cart:       GET/POST/DELETE /api/v1/ecom/cart
Orders:     POST /api/v1/ecom/orders
Guest:      POST /api/guest/checkout
Settings:   GET  /api/settings (shipping rates, delivery estimates)
```

---

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in required env vars
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Hometex Bangladesh
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
PUSHER_APP_ID=
PUSHER_SECRET=
```

---

## Related Repos

- [hometex-api](https://github.com/ShahriarHim/hometex-api) — Laravel 10 backend
- [hometex-ims](https://github.com/ShahriarHim/hometex-ims) — Vite + React 18 admin dashboard
