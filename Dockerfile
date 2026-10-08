# Étape 1 : build de l'application
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : on sert les fichiers avec nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Redirige toutes les routes vers index.html (pour Vue Router)
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
