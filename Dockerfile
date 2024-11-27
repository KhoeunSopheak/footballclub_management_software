FROM node:18

WORKDIR /index

COPY package.json ./
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]


# build docker image
# run container from the image
# check if container is running up