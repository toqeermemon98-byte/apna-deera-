# Apna Deera Restaurant — Next.js

A Next.js 15 application for the Apna Deera restaurant website, menu, cart/checkout, table QR workflow, reservations, customer reviews and operations dashboard. Existing locally bundled menu artwork is retained under `public/assets`.

## Run locally

1. Install Node.js 20.9+.
2. In this folder run `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.
4. For a production build run `npm run build`, then `npm start`.

## Routes

- `/` — restaurant website and menu
- `/admin` — admin dashboard (also available at `/admin.html` for compatibility)
- `/api/health`, `/api/orders`, `/api/reservations`, `/api/reviews` — JSON API

Orders, reservations and reviews are stored in `data/store.json` on the Node.js host. Back up this file. The included admin dashboard is a functional operations view, but is not protected by staff authentication; configure authentication, HTTPS, database backups and a payment provider before public production use. Payment methods in the checkout are recorded as selections and do not process payments.

## Menu photography

Each menu entry uses its own local image path wherever the supplied archive contains a matching dish image. A true restaurant-specific photo cannot be guaranteed from illustrative stock-style assets; replace those files with approved restaurant photography for exact plating fidelity. Do not reuse a photo for two different dishes.
