# -------------->
FROM node:16.13-alpine as installer

USER node

WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json prisma/schema.prisma ./
COPY --chown=node:node . .

RUN npm ci --only=production --legacy-peer-deps \
&& npm run prisma:generate \
&& npm run build:prod

# -------------->
FROM node:16.13-alpine as runner

ENV NODE_ENV 'production'

RUN apk add dumb-init

USER node

WORKDIR /home/node

COPY --chown=node:node --from=installer /home/node/node_modules ./node_modules
COPY --chown=node:node --from=installer /home/node/dist ./dist
COPY --chown=node:node package.json ./

CMD ["npm", "run", "start:prod"]
