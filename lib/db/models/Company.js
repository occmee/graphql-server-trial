'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Company = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Company = exports.Company = _connect.sequelize.define('company', {
  name: {
    type: _sequelize2.default.STRING,
    field: 'name'
  },
  phoneNumber: {
    type: _sequelize2.default.STRING,
    field: 'phone_number'
  }
}, {
  freezeTableName: true });