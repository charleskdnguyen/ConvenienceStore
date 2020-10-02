function getClients(parent, args, context, info) {
  return context.prisma.client.findMany();
}

async function getClient(parent, args, context, info) {
  return await context.prisma.client.findOne({
    where: {
      id: Number(args.id),
    }
  });
}

function getProduces(parent, args, context, info) {
  return context.prisma.produce.findMany();
}

module.exports = {
  getClients,
  getClient,
  getProduces,
}
