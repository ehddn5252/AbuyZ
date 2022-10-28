FROM node:alpine as build-stage

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
# USER node

# RUN npm install --production

RUN yarn install --production

COPY . /usr/src/app

# RUN npm run build
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]

# production stage
FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /.next /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/.next /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]