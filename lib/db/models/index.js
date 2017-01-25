'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Company = require('./Company');

Object.keys(_Company).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Company[key];
    }
  });
});

var _User = require('./User');

Object.keys(_User).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _User[key];
    }
  });
});
exports.initTables = initTables;
function initTables() {

  function initComapny() {
    return _Company.Company.sync({ force: true }).then(function () {
      return _Company.Company.create({
        name: 'リレーションズ株式会社'
      });
    });
  }

  function initUser() {
    return _User.User.sync({ force: true }).then(function () {
      return _User.User.create({
        firstName: 'John',
        lastName: 'Hancock',
        email: 'hoge@a.com',
        companyId: 1
      });
    });
  }

  return initComapny().then(function () {
    initUser();
  });
}