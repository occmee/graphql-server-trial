import { makeExecutableSchema } from 'graphql-tools';
import { project } from './db/mocks';
// import { Company, User } from './db/models';

const typeDefs = [`

scalar Date

enum ProjectStatus {
  PENDING
  IN_PROGRESS
  DONE
}

enum AccessPolicy {
  PUBLIC
  PRIVATE
}

enum NodeType {
  POST_TEXT
  POST_FILE
  POST_IMAGE
  COMMENT_TEXT
  COMMENT_FILE
  COMMENT_IMAGE
  LOG_STATUS_UPDATE
  LOG_TAG_ADD
  LOG_TAG_REMOVE
  LOG_MEMBER_ADD
  LOG_MEMBER_REMOVE
  LOG_POST_UPDATE
  LOG_POST_REMOVE
}

type Query {
  hello: String
  project(id: ID!): Project
  company(id: ID!): Company
  user(id: ID!): User
}

type Mutation {
  createCompany(input: CompanyInput): Company
  updateCompany(id: ID!, input: CompanyInput): Company
}

input CompanyInput {
  companyName: String
  phoneNumber: String
  admin: UserInput
}

input UserInput {
  firstName: String
  lastName: String
  email: String
}

type Company {
  id: ID!
  name: String!
  phoneNumber: String
  adminId: Int
  admin: User
}

type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  name: String
  companyId: Int
  company: Company
}

type Project {
  id: ID!
  companyId: Int
  status: ProjectStatus
  title: String
  access: Access
  owner: User
  members: [User]
  tags: [Tag]
  pins: [Node]
  files: [Node]
  nodes: [Node]
}

type Access {
  policy: AccessPolicy
  allowed: [User]
}

type Tag {
  id: ID
  name: String
}

type Like {
  count: Int
  byMe: Boolean
}

type Node {
  type: NodeType
  timestamp: Date
  payload: NodeBody
  nodes: [Node]
}

# union Post = TextPost | FilePost
# union Log = StatusLog | TagLog | MemberLog | PostLog
# union NodeBody = Post | Log  # union の union はできない

union NodeBody = TextPost | FilePost | StatusLog | TagLog | MemberLog | PostLog

type TextPost {
  id: Int
  author: User
  like: Like
  title: String
  body: String
}

type FilePost {
  id: Int
  author: User
  like: Like
  title: String
  body: String
  filename: String
  url: String
}

type StatusLog {
  doer: User
  status: ProjectStatus
}

type TagLog {
  doer: User
  tag: Tag
}

type MemberLog {
  doer: User
  member: User
}

union Post = TextPost | FilePost
type PostLog {
  doer: User
  post: Post
}


type __NodeBody {
  id: ID
  author: User
  title: String
  body: String
  filename: String
  url: String
  doer: User
  status: ProjectStatus
  tag: Tag
  member: User
  post: NodeBody
  like: Like
}


input CompanyRegisterInput {
  companyName: String!
  userFirstName: String!
  userLastName: String!
  email: String!
}

schema {
  query: Query,
  mutation: Mutation
}`];

const fakeDatabase = {
  companies: [],
  users: []
};

const resolvers = {
  Query: {
    hello(obj, args, context, info) {
      return 'world';
    },

    project(obj, args, context, info) {
      return project(args.id);
    },

    company(obj, args, context, info) {
      /*
      return Company.findById(args.id);
      */

      // use fakeDatabase
      if(args.id > fakeDatabase.companies.length) {
        return null;
      }
      const company = fakeDatabase.companies[args.id-1];
      if(company.adminId <= fakeDatabase.users.length) {
        company.admin = fakeDatabase.users[company.adminId-1];
      }
      return company;
    },

    user(obj, args, context, info) {
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
      if(args.id > fakeDatabase.users.length) {
        return null;
      }
      const user = fakeDatabase.users[args.id-1];
      if(user.companyId <= fakeDatabase.companies.length) {
        user.company = fakeDatabase.companies[user.companyId-1];
      }
      return user;
    }
  },

  Mutation: {
    createCompany(obj, args, context, info) {
      const input = args.input;

      const companyId = fakeDatabase.companies.length + 1;
      const userId = fakeDatabase.users.length + 1;

      const company = {
        id: companyId,
        name: input.companyName,
        phoneNumber: input.phoneNumber,
        adminId: userId
      };
      fakeDatabase.companies.push(company);

      const user = {
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

    updateCompany(obj, args, context, info) {
      const id = args.id;
      const input = args.input;

      if(id > fakeDatabase.companies.length) {
        return null;
      }

      const company = fakeDatabase.companies[id-1];
      if (input.companyName) {
        company.name = input.companyName;
      }
      if (input.phoneNumber) {
        company.phoneNumber = input.phoneNumber;
      }
      fakeDatabase.companies[id-1] = company;

      if(company.adminId <= fakeDatabase.users.length) {
        const admin = fakeDatabase.users[company.adminId-1];
        if (input.admin.firstName) {
          admin.firstName = input.admin.firstName;
        }
        if (input.admin.lastName) {
          admin.lastName = input.admin.lastName;
        }
        if (input.admin.email) {
          admin.email = input.admin.email;
        }
        fakeDatabase.users[company.adminId-1] = admin;
        company.admin = admin;
      }

      return fakeDatabase.companies[id-1];
    }
  }
};

const schema = makeExecutableSchema({typeDefs, resolvers});
// console.log(schema);

module.exports = {
  schema
};