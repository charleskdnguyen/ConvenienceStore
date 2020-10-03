async function store(parent, args, context, info) {
  return await context.prisma.produce
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .store();
}

async function receipts(parent, args, context, info) {
  return await context.prisma.produce
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .receipts() || [];
}

module.exports = {
  store,
  receipts,
};
