'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connect = require('../connect');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = exports.User = _connect.sequelize.define('user', {
  firstName: {
    type: _sequelize2.default.STRING,
    field: 'first_name'
  },
  lastName: {
    type: _sequelize2.default.STRING,
    field: 'last_name'
  },
  email: {
    type: _sequelize2.default.STRING,
    field: 'email'
  },
  companyId: {
    type: _sequelize2.default.INTEGER,
    field: 'company_id',
    references: {
      model: _.Company,
      key: 'id'
    }
  }
}, {
  freezeTableName: true });

User.belongsTo(_.Company, { foreignKey: 'company_id' });