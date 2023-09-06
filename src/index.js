const {proxy, createServer} = require('aws-serverless-express');
const {eventContext} = require('aws-serverless-express/middleware')
const app = require('./main');

app.use(eventContext())
const server = createServer(app)

const handler = (event, context) => {
   return proxy(server, event, context, 'PROMISE').promise;
};

module.exports.handler = handler;