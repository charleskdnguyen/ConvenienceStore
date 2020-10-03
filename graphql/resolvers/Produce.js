async function store(parent, args, context, info) {
  return await context.prisma.produce
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .store();
}

async function receiptscontainingproduce(parent, args, context, info) {
  return await context.prisma.produce
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .receipt() || [];
}

module.exports = {
  store,
  receiptscontainingproduce,
};
