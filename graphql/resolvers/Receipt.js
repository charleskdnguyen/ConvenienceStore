async function client(parent, args, context, info) {
  return await context.prisma.receipt
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .client();
}

async function store(parent, args, context, info) {
  return await context.prisma.receipt
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .store();
}
async function produces(parent, args, context, info) {
  return await context.prisma.receipt
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .produces() || [];
}

module.exports = {
  client,
  store,
  produces,
};
