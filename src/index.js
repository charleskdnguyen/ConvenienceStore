const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('graphql-yoga')
const Query = require('../graphql/resolvers/Query');
const Mutation = require('../graphql/resolvers/Mutation');
const Subscription = require('../graphql/resolvers/Subscription')
const Produce = require('../graphql/resolvers/Produce');
const Client = require('../graphql/resolvers/Client');
const Receipt = require('../graphql/resolvers/Receipt');
const Store = require('../graphql/resolvers/Store');
const Owner = require('../graphql/resolvers/Owner');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Produce,
  Client,
  Receipt,
  Store,
  Owner,
};

const pubsub = new PubSub();

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      pubsub,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
