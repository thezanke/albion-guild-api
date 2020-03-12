FROM node:12.8 AS builder
WORKDIR /app
COPY package* ./
RUN npm install
COPY tsconfig* nest* ./
COPY src ./src
RUN npm run build

FROM node:12.8
WORKDIR /app
COPY --from=builder /app/package* ./
COPY --from=builder /app/node_modules ./node_modules
RUN npm prune --production
COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "start:prod"]
