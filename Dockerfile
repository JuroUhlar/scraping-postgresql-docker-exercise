FROM node:14-alpine
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY yarn.lock /home/app/

RUN yarn

COPY . /home/app

RUN yarn build

CMD ./scripts/start.sh