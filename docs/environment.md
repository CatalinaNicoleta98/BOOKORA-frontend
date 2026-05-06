# Environment Configuration

Bookora keeps environment variables out of Git. Create local `.env*` files on your machine or configure variables in your hosting dashboard instead of committing them.

## Frontend Variables

Required for Vite builds:

- `VITE_API_BASE_URL`
- `VITE_ASSET_BASE_URL`

Production build values:

- `VITE_API_BASE_URL=https://bookora-backend-592x.onrender.com/api`
- `VITE_ASSET_BASE_URL=https://bookora-backend-592x.onrender.com`

## Notes

- Only `VITE_` variables are exposed to the browser.
- Do not store secrets in frontend environment variables.
