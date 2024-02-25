# -------------->
FROM node:20.11.1-alpine3.18 as builder

USER node

WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json src/infra/repositories/prisma/schema.prisma ./

RUN npm ci --legacy-peer-deps

# -------------->
FROM node:20.11.1-alpine3.18 as runner

USER node

WORKDIR /home/node

COPY --chown=node:node --from=builder /home/node/node_modules/ ./node_modules
COPY --chown=node:node . .

CMD ["npm", "run", "start:dev"]
