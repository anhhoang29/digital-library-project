FROM node:18-alpine AS BUILD
WORKDIR /app
COPY digital-library-fe/package.json ./digital-library-fe/package.json
RUN cd digital-library-fe && npm i --force
COPY digital-library-fe ./digital-library-fe
RUN cd digital-library-fe && npm run build 
WORKDIR /app/digital-library-fe


FROM nginx:alpine
COPY ./digital-library-fe/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
EXPOSE 80
COPY --from=BUILD /app/digital-library-fe/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

