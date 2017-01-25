'use strict';

var _graphqlTools = require('graphql-tools');

var _mocks = require('./db/mocks');

// import { Company, User } from './db/models';

var typeDefs = ['\n\nscalar Date\n\nenum ProjectStatus {\n  PENDING\n  IN_PROGRESS\n  DONE\n}\n\nenum AccessPolicy {\n  PUBLIC\n  PRIVATE\n}\n\nenum NodeType {\n  POST_TEXT\n  POST_FILE\n  POST_IMAGE\n  COMMENT_TEXT\n  COMMENT_FILE\n  COMMENT_IMAGE\n  LOG_STATUS_UPDATE\n  LOG_TAG_ADD\n  LOG_TAG_REMOVE\n  LOG_MEMBER_ADD\n  LOG_MEMBER_REMOVE\n  LOG_POST_UPDATE\n  LOG_POST_REMOVE\n}\n\ntype Query {\n  hello: String\n  project(id: ID!): Project\n  company(id: ID!): Company\n  user(id: ID!): User\n}\n\ntype Mutation {\n  createCompany(input: CompanyInput): Company\n  updateCompany(id: ID!, input: CompanyInput): Company\n}\n\ninput CompanyInput {\n  companyName: String\n  phoneNumber: String\n  admin: UserInput\n}\n\ninput UserInput {\n  firstName: String\n  lastName: String\n  email: String\n}\n\ntype Company {\n  id: ID!\n  name: String!\n  phoneNumber: String\n  adminId: Int\n  admin: User\n}\n\ntype User {\n  id: ID!\n  firstName: String\n  lastName: String\n  email: String\n  name: String\n  companyId: Int\n  company: Company\n}\n\ntype Project {\n  id: ID!\n  companyId: Int\n  status: ProjectStatus\n  title: String\n  access: Access\n  owner: User\n  members: [User]\n  tags: [Tag]\n  pins: [Node]\n  files: [Node]\n  nodes: [Node]\n}\n\ntype Access {\n  policy: AccessPolicy\n  allowed: [User]\n}\n\ntype Tag {\n  id: ID\n  name: String\n}\n\ntype Like {\n  count: Int\n  byMe: Boolean\n}\n\ntype Node {\n  type: NodeType\n  timestamp: Date\n  payload: NodeBody\n  nodes: [Node]\n}\n\n# union Post = TextPost | FilePost\n# union Log = StatusLog | TagLog | MemberLog | PostLog\n# union NodeBody = Post | Log  # union \u306E union \u306F\u3067\u304D\u306A\u3044\n\nunion NodeBody = TextPost | FilePost | StatusLog | TagLog | MemberLog | PostLog\n\ntype TextPost {\n  id: Int\n  author: User\n  like: Like\n  title: String\n  body: String\n}\n\ntype FilePost {\n  id: Int\n  author: User\n  like: Like\n  title: String\n  body: String\n  filename: String\n  url: String\n}\n\ntype StatusLog {\n  doer: User\n  status: ProjectStatus\n}\n\ntype TagLog {\n  doer: User\n  tag: Tag\n}\n\ntype MemberLog {\n  doer: User\n  member: User\n}\n\nunion Post = TextPost | FilePost\ntype PostLog {\n  doer: User\n  post: Post\n}\n\n\ntype __NodeBody {\n  id: ID\n  author: User\n  title: String\n  body: String\n  filename: String\n  url: String\n  doer: User\n  status: ProjectStatus\n  tag: Tag\n  member: User\n  post: NodeBody\n  like: Like\n}\n\n\ninput CompanyRegisterInput {\n  companyName: String!\n  userFirstName: String!\n  userLastName: String!\n  email: String!\n}\n\nschema {\n  query: Query,\n  mutation: Mutation\n}'];

var fakeDatabase = {
  companies: [],
  users: []
};

var resolvers = {
  Query: {
    hello: function hello(obj, args, context, info) {
      return 'world';
    },
    project: function project(obj, args, context, info) {
      return (0, _mocks.project)(args.id);
    },
    company: function company(obj, args, context, info) {
      /*
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

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });
// console.log(schema);

module.exports = {
  schema: schema
};