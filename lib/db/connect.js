'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var database = 'second_sequelize_test';
var hostname = process.env.DB_HOSTNAME || 'localhost';
var username = process.env.DB_USERNAME || 'root';
var password = process.env.DB_PASSWORD || '';

var sequelize = exports.sequelize = new _sequelize2.default(database, username, password, {
  host: hostname,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});