FROM node:12.22.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# container에 git 설치
RUN apk update && apk upgrade
RUN apk add --no-cache git

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

CMD ["npm", "start"]


#FROM nginx 
#EXPOSE 3001
#COPY ./defalut.conf /etc/nginx/conf.d/default.conf 
#COPY --from=builder /app/build  /usr/share/nginx/html