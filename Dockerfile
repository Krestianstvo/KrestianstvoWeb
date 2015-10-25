FROM node:latest

RUN cd /usr/src/myapp; npm install
EXPOSE  3001

CMD ["node", "/usr/src/myapp/app-express.js"]