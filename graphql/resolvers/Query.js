async function getClients(parent, args, context, info) {
  return await context.prisma.client.findMany();
}

async function getClient(parent, args, context, info) {
  return await context.prisma.client.findOne({
    where: {
      id: Number(args.id),
    },
  });
}

async function getProduces(parent, args, context, info) {
  return await context.prisma.produce.findMany();
}

async function getProduce(parent, args, context, info) {
  return await context.prisma.produce.findOne({
    where: {
      id: Number(args.id),
    },
  });
}

async function getStore(parent, args, context, info) {
  return await context.prisma.store.findOne({
    where: {
      id: Number(args.id),
    },
  });
}

async function getStores(parent, args, context, info) {
  return await context.prisma.store.findMany();
}

async function getReceipt(parent, args, context, info) {
  return await context.prisma.receipt.findOne({
    where: {
      id: Number(args.id),
    }
  });
}

async function getReceipts(parent, args, context, info) {
  return await context.prisma.receipt.findMany();
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
