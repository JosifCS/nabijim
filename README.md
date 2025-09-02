# Nabíjím.to

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ENV variables

```env
DATABASE_URL=""
AUTH0_SECRET="" (openssl rand -hex 32)
APP_BASE_URL="http://localhost:3000"
AUTH0_DOMAIN=""
AUTH0_CLIENT_ID=""
AUTH0_CLIENT_SECRET=""
ADMINS=["admin@email.com"]
```

## Run it

```ps
pnpm i
pnpm prisma generate
pnpm run dev
```
