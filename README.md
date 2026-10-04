# Shubhash South Indian Snacks Center — Website

A static restaurant website with Vercel serverless API and Supabase comments.

## Project Structure

```
shubhash/
├── index.html          # Main website
├── admin.html          # Comment moderation (protected, noindex)
├── config.js           # Supabase public credentials (no secrets)
├── schema.sql          # Supabase table schema
├── api/
│   └── reviews.js      # Vercel serverless function for Google Reviews
├── img/                # All images (WebP + JPG)
│   ├── logo.webp
│   ├── favicon.png
│   ├── hero.webp
│   └── ...             # Food images
└── .env.example        # Environment variable template
```

## Local Development

```bash
# With API (Google Reviews endpoint):
npx vercel dev

# Static only (no reviews API):
npx serve .
# or
python -m http.server 8080
```

## Supabase Setup (Comments)

1. Create a free Supabase project at [supabase.com](https://supabase.com)
2. Run `schema.sql` in the Supabase SQL Editor
3. Paste your project URL and anon public key into `config.js`
4. Create admin user: Supabase → Authentication → Users → Add user

## Google Reviews Setup

Set these environment variables in Vercel:

| Variable               | Description                             |
|------------------------|-----------------------------------------|
| `GOOGLE_PLACES_API_KEY`| Google Cloud API key                    |
| `GOOGLE_PLACE_ID`      | Place ID from Google Place ID Finder    |

Enable **Places API (New)** in Google Cloud Console.

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. No build step needed — static site
4. Add environment variables in Vercel → Settings → Environment Variables
5. Deploy

## Google Business Profile

Add your website URL in Google Business Profile → Edit Profile → Contact → Website.

## Admin Panel

Access `/admin.html` to moderate comments. Sign in with your Supabase admin user credentials. This page is excluded from search engines (`noindex`).
