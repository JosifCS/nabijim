# Nabíjím.to

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ENV variables

-   DATABASE_URL
-   AUTH0_SECRET _(openssl rand -hex 32)_
-   APP_BASE_URL _(http://localhost:3000)_
-   AUTH0_DOMAIN
-   AUTH0_CLIENT_ID
-   AUTH0_CLIENT_SECRET

## Run it

```
pnpm i
pnpm prisma generate
pnpm run dev
```
