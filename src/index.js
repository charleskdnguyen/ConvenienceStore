const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const Query = require('../graphql/resolvers/Query');
const Mutation = require('../graphql/resolvers/Mutation');
const Produce = require('../graphql/resolvers/Produce');

const resolvers = {
  Query,
  Mutation,
  Produce,
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
