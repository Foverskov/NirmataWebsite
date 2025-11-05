This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup

### Required Environment Variables

This project uses [UploadThing](https://uploadthing.com) for file upload functionality. To get started:

1. Copy the `.env.local.template` file to `.env.local`:
   ```bash
   cp .env.local.template .env.local
   ```

2. Set up your UploadThing account:
   - Sign up at [https://uploadthing.com](https://uploadthing.com)
   - Create a new app in your UploadThing dashboard
   - Copy your API credentials

3. Update `.env.local` with your credentials:
   ```bash
   UPLOADTHING_TOKEN=your_uploadthing_token_here
   UPLOADTHING_SECRET=your_uploadthing_secret_here
   NEXT_PUBLIC_UPLOADTHING_URL=https://uploadthing.com
   ```

#### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `UPLOADTHING_TOKEN` | Yes | UploadThing API token for server-side operations |
| `UPLOADTHING_SECRET` | Yes | UploadThing API secret for authentication |
| `NEXT_PUBLIC_UPLOADTHING_URL` | No | Public URL configuration for UploadThing (default: https://uploadthing.com) |
| `ALLOWED_UPLOAD_ORIGIN` | No | Allowed origin for CORS (defaults to `http://localhost:3000` for development, set to your production domain when deploying) |
| `CUSTOM_STORAGE_ENDPOINT` | No | Custom storage endpoint for future migration to self-hosted storage |

**Note:** The `NEXT_PUBLIC_*` prefix makes the variable accessible in client-side code. Never use this prefix for secrets!

### File Upload Configuration

The project is configured with the following upload settings:
- CORS policies configured for UploadThing endpoints (credentials disabled for security)
- Image domains whitelisted: `uploadthing.com`, `utfs.io`
- File size limits and allowed file types will be configured in the UploadThing API route implementation

**Important:** File uploads require server-side capabilities. When implementing upload functionality, you'll need to remove or disable static export mode from the Next.js configuration.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
