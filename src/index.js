const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const Query = require('../graphql/resolvers/Query');
const Mutation = require('../graphql/resolvers/Mutation');
const Produce = require('../graphql/resolvers/Produce');
const Client = require('../graphql/resolvers/Client');
const Receipt = require('../graphql/resolvers/Receipt');
const Store = require('../graphql/resolvers/Store');
const Owner = require('../graphql/resolvers/Owner');

const resolvers = {
  Query,
  Mutation,
  Produce,
  Client,
  Receipt,
  Store,
  Owner,
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
