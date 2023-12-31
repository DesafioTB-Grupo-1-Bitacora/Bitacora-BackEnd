const {proxy, createServer} = require('aws-serverless-express');
const {eventContext} = require('aws-serverless-express/middleware')
const app = require('./main');

app.use(eventContext())
const server = createServer(app)

const handler = async (event, context) => {
   const response =  await proxy(server, event, context, 'PROMISE').promise;
   response.headers['Access-Control-Allow-Origin'] = process.env.ORIGIN_HEADER;
   response.headers['Access-Control-Allow-Credentials'] = 'true';
   return response;
};

module.exports.handler = handler;