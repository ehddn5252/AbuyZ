# build stage
FROM node:lts-alpine as build-stage
WORKDIR /.next
COPY package*.json ./
RUN npm install
COPY . .
RUN /bin/sh -c CI=false npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /.next /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]