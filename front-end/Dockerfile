FROM node:12 as builder
WORKDIR /app
COPY ./package*.json ./ 
RUN npm install 
COPY . . 
RUN npm run build 


FROM nginx 
EXPOSE 3001
COPY ./defalut.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder /app/build  /usr/share/nginx/html