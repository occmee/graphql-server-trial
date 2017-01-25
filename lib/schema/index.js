'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var _mocks = require('./db/mocks');

var _define = require('./define');

var _resolver = require('./resolver');

// import { Company, User } from './db/models';

var schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: _define.typeDefs, resolvers: _resolver.resolvers });
// console.log(schema);
/*
module.exports = {
  schema
};
*/