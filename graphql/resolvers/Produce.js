async function store(parent, args, context, info) {
  return await context.prisma.produce
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .store();
}

async function receiptsContainingProduce(parent, args, context, info) {
  return await context.prisma.produce
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .receiptsContainingProduce() || [];
}

module.exports = {
  store,
  receiptsContainingProduce,
};
