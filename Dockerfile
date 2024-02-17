################################################################################
# reference:
# - https://github.com/vercel/next.js/blob/canary/examples/with-docker-compose/next-app/prod.Dockerfile
################################################################################

ARG NODE_VERSION=18.18.2

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

################################################################################

# NOTE: next.jsの画像最適化にはsharpが必要
# https://nextjs.org/docs/messages/sharp-missing-in-production
FROM base AS deps

COPY package.json ./

RUN SHARP_VERSION=`node -p -e "require('./package.json').dependencies.sharp"` \
    npm i sharp@"$SHARP_VERSION"

################################################################################

FROM base as builder

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build Next.js based on the preferred package manager
RUN npm run build

################################################################################

FROM base as runner

# Use production node environment by default.
ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Install production dependencies.
COPY --from=deps /usr/src/app/node_modules/ ./node_modules/

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD node server.js
