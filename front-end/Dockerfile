FROM node:12.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install 
RUN npm install react-scripts@3.0.1 -g


CMD ["npm", "start"]
#RUN npm run build 


#FROM nginx 
#EXPOSE 3001
#COPY ./defalut.conf /etc/nginx/conf.d/default.conf 
#COPY --from=builder /app/build  /usr/share/nginx/html