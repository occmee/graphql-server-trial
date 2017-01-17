'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// koa@2
var app = new _koa2.default(); // koa-router@next

var router = new _koaRouter2.default();
var PORT = 3000;

router.all('/graphql', (0, _koaConvert2.default)((0, _koaGraphql2.default)({
  schema: _schema.schema,
  graphiql: true
})));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);