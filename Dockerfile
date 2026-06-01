# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer-cache friendly)
COPY package*.json ./

# Install production deps only
RUN npm ci --omit=dev

# Copy source
COPY index.js ./
COPY test.js ./

# ── Stage 2: run ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Pull only what we need from the builder stage
COPY --from=builder /app /app

# Drop privileges
USER appuser

# App listens on 3000 by default
EXPOSE 3000

ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
