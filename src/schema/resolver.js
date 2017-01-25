import { makeExecutableSchema } from 'graphql-tools';
import { project } from '../db/mocks';
// import { Company, User } from '../db/models';

const fakeDatabase = {
  companies: [],
  users: []
};

export const resolvers = {
  Query: {
    hello(obj, args, context, info) {
      return 'world';
    },

    project(obj, args, context, info) {
      return project(args.id);
    },

    company(obj, args, context, info) {
      /*
      // use database
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
