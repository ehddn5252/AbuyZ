# build stage
FROM node:lts-alpine as build-stage
WORKDIR /
COPY package*.json ./
RUN yarn install
COPY . .
RUN /bin/sh -c CI=false yarn build

# production stage
FROM nginx:stable-alpine as production-stage
# RUN ls
COPY --from=build-stage /.next /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]