'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _graphqlServerKoa = require('graphql-server-koa');

var _schema = require('./schema');

var _models = require('./db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// koa-router@next
var app = new _koa2.default(); // koa-bodyparser@next
// koa@2

var router = new _koaRouter2.default();
var port = process.env.PORT || 3000;

// initTables();

app.use((0, _koaBodyparser2.default)());
router.post('/graphql', (0, _graphqlServerKoa.graphqlKoa)({ schema: _schema.schema }));
router.get('/graphiql', (0, _graphqlServerKoa.graphiqlKoa)({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, function () {
  console.log('App is running on port ' + port + '...');
});