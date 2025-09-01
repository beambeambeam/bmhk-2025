FROM node:22-alpine AS base
RUN npm install -g pnpm
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN pnpm install -g turbo
COPY . .
RUN turbo prune staff --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

ARG NEXT_PUBLIC_STAFFAPP_URL
ENV NEXT_PUBLIC_STAFFAPP_URL=$NEXT_PUBLIC_STAFFAPP_URL

RUN pnpm turbo build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/staff/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/staff/.next/static ./apps/staff/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/staff/public ./apps/staff/public

CMD ["node", "apps/staff/server.js"]
