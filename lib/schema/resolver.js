'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _graphqlTools = require('graphql-tools');

var _mocks = require('../db/mocks');

// import { Company, User } from '../db/models';

var fakeDatabase = {
  companies: [],
  users: []
};

var resolvers = exports.resolvers = {
  Query: {
    hello: function hello(obj, args, context, info) {
      return 'world';
    },
    project: function project(obj, args, context, info) {
      return (0, _mocks.project)(args.id);
    },
    company: function company(obj, args, context, info) {
      /*
      // use database
      return Company.findById(args.id);
      */

      // use fakeDatabase
      if (args.id > fakeDatabase.companies.length) {
        return null;
      }
      var company = fakeDatabase.companies[args.id - 1];
      if (company.adminId <= fakeDatabase.users.length) {
        company.admin = fakeDatabase.users[company.adminId - 1];
      }
      return company;
    },
    user: function user(obj, args, context, info) {
      /*
      // use database
      return User.findAll({
        where: {
          id: args.id
        },
        include: [
          {model: Company}
        ]
      }).then(users => {
        if (users) {
          return users[0];
        }
        return null;
      }).catch(err => {
        console.log(err);
      });
      */

      // use fakeDatabase
      if (args.id > fakeDatabase.users.length) {
        return null;
      }
      var user = fakeDatabase.users[args.id - 1];
      if (user.companyId <= fakeDatabase.companies.length) {
        user.company = fakeDatabase.companies[user.companyId - 1];
      }
      return user;
    }
  },

  Mutation: {
    createCompany: function createCompany(obj, args, context, info) {
      var input = args.input;

      var companyId = fakeDatabase.companies.length + 1;
      var userId = fakeDatabase.users.length + 1;

      var company = {
        id: companyId,
        name: input.companyName,
        phoneNumber: input.phoneNumber,
        adminId: userId
      };
      fakeDatabase.companies.push(company);

      var user = {
        id: userId,
        firstName: input.admin.firstName,
        lastName: input.admin.lastName,
        email: input.admin.email,
        companyId: companyId
      };
      fakeDatabase.users.push(user);

      company.admin = user;
      return company;
    },
    updateCompany: function updateCompany(obj, args, context, info) {
      var id = args.id;
      var input = args.input;

      if (id > fakeDatabase.companies.length) {
        return null;
      }

      var company = fakeDatabase.companies[id - 1];
      if (input.companyName) {
        company.name = input.companyName;
      }
      if (input.phoneNumber) {
        company.phoneNumber = input.phoneNumber;
      }
      fakeDatabase.companies[id - 1] = company;

      if (company.adminId <= fakeDatabase.users.length) {
        var admin = fakeDatabase.users[company.adminId - 1];
        if (input.admin.firstName) {
          admin.firstName = input.admin.firstName;
        }
        if (input.admin.lastName) {
          admin.lastName = input.admin.lastName;
        }
        if (input.admin.email) {
          admin.email = input.admin.email;
        }
        fakeDatabase.users[company.adminId - 1] = admin;
        company.admin = admin;
      }

      return fakeDatabase.companies[id - 1];
    }
  }
};