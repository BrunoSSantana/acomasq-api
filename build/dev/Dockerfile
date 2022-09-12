# -------------->
FROM node:16.13-alpine as builder

USER node

WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json prisma/schema.prisma ./

RUN npm ci

# -------------->
FROM node:16.13-alpine as runner

USER node

WORKDIR /home/node

COPY --chown=node:node --from=builder /home/node/node_modules/ ./node_modules
COPY --chown=node:node . .

RUN npm run prisma:generate

CMD ["npm", "run", "start:dev"]
