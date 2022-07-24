# -------------->
FROM node:16.13-alpine as installer

USER node

WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json  src/infra/repositories/prisma/schema.prisma ./

RUN npm ci --only=production --legacy-peer-deps


# -------------->
FROM node:16.13-alpine as builder

USER node

WORKDIR /home/node

COPY --chown=node:node . .

RUN npm ci && npm run prisma:generate && npm run build:prod

# -------------->
FROM node:16.13-alpine as runner

RUN apk add dumb-init

ENV NODE_ENV 'production'

USER node

WORKDIR /home/node

COPY --chown=node:node --from=installer /home/node/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/dist ./dist
COPY --chown=node:node package.json ./
COPY --chown=node:node prisma ./

CMD ["npm", "run", "start:prod"]
