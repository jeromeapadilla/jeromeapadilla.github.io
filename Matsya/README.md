# Matsya

A responsive ordering and delivery operations app for Filipino-inspired matcha taho.

## Run locally

From this folder:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Customer experience

- Nine matcha-taho flavours with category and plant-based filters
- Size, sweetness, milk, topping, and quantity customization
- Persistent basket with delivery fee, tax, and totals
- Delivery address, notes, scheduling, and demo payment options
- Order confirmation and live status/ETA tracking
- Responsive mobile navigation and installable PWA manifest

## Shop admin

Choose **Shop admin** in the footer to open operations. Customer orders appear immediately in the dashboard. Admin can:

- View daily orders, sales, active orders, and cups sold
- Filter the live order queue
- Change order status and customer-facing delivery ETA
- Review menu availability
- View active deliveries on the delivery panel
- Toggle the store open or closed

## Production integrations

The current build is a complete front-end prototype and saves state in the browser with `localStorage`. Before accepting real orders, connect:

- A database and authenticated API (for example Supabase or Firebase)
- Stripe Payment Intents / Apple Pay for real payments
- Google Maps or Mapbox for address autocomplete, geocoding, and live rider locations
- Customer and admin authentication with role-based access
- Push, SMS, or email notifications

The checkout clearly identifies itself as a demo and never transmits or charges payment data.
