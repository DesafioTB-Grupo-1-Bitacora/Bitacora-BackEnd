import {proxy, createServer} from 'aws-serverless-express'
import {eventContext} from 'aws-serverless-express/middleware';
import app from './main';

app.use(eventContext())
const server = createServer(app)

export const handler = async (event, context) => {
   return proxy(server, event, context, 'PROMISE').promise;
};