FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY nx.json tsconfig.base.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm ci
RUN npm run build:all

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/apps/fe-learning/dist /usr/share/nginx/html
COPY --from=build /app/apps/cotizaciones/dist /usr/share/nginx/html/cotizaciones
COPY --from=build /app/apps/factura-de-venta/dist /usr/share/nginx/html/factura-de-venta
COPY --from=build /app/apps/notas-de-credito/dist /usr/share/nginx/html/notas-de-credito

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
