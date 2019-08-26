FROM node:9.8.0
WORKDIR /app
COPY . /app
RUN cd /app; npm install
EXPOSE 7000 
RUN npm i -g webpack webpack-cli
RUN webpack-cli
CMD [ "node", "dist/bundle-be.js" ]