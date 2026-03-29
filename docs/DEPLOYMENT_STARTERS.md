# Starter deployment

The starter platform is designed for:
- Vercel deployments for App Router workflows
- Azure container deployments for teams standardizing on containers

Shared deployment assets live in `starters/shared-shell/`.

Canonical environment surface:
- `NODE_ENV`
- `AI_PROVIDER`
- `NEXT_PUBLIC_APP_NAME`
- provider-specific secrets layered by the consuming app

Every starter now exposes `app/api/agent/route.ts` as the server integration seam for agent interactions.
