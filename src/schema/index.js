import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './define';
import { resolvers } from './resolver';

export const schema = makeExecutableSchema({typeDefs, resolvers});
// console.log(schema);
