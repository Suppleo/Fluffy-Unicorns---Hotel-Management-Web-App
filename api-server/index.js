var restify = require('restify');
var jwt = require('jsonwebtoken');
var format = require('pg-format');
var Router = require('restify-router').Router;
var router = new Router();
var server = restify.createServer();

const { Client } = require('pg');
var corsMiddleware = require('restify-cors-middleware2');

var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders:['X-App-Version'],
    exposeHeaders:[]
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true })); // POST params
server.use(restify.plugins.queryParser()); // GET query

server.get('/uploads/*', restify.plugins.serveStatic({
    directory: __dirname,
}));

const root = require('./routes/root');
const room = require('./routes/room');
const customer = require('./routes/customer');
const booking = require('./routes/booking');
const account = require('./routes/account');
const service = require('./routes/service');
const payment_card = require('./routes/payment_card');

root.applyRoutes(server);
room.applyRoutes(server);
customer.applyRoutes(server);
booking.applyRoutes(server);
account.applyRoutes(server);
service.applyRoutes(server);
payment_card.applyRoutes(server);

var PORT = 8080;
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});