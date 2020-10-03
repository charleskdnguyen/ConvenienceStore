const { APP_SECRET, getClientId } = require('../../src/utils')

getClients = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .client
    .findMany();
}


getClient = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .client
    .findOne({
      where: {
        id: Number(args.id),
      },
    });
}


getProduces = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .produce
    .findMany();
}


getProduce = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .produce
    .findOne({
      where: {
        id: Number(args.id),
      },
    });
}


getStore = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .store
    .findOne({
      where: {
        id: Number(args.id),
      },
    });
}


getStores = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .store
    .findMany();
}


getReceipt = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .receipt
    .findOne({
      where: {
        id: Number(args.id),
      }
    });
}


getReceipts = async (parent, args, context, info) => {
  const clientId = getClientId(context);

  return await context
    .prisma
    .receipt
    .findMany();
}


module.exports = {
  getClients,
  getClient,
  getProduces,
  getProduce,
  getStore,
  getStores,
  getReceipt,
  getReceipts,
};
