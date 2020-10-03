async function receipts(parent, args, context, info) {
  return await context.prisma.store
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .receipts() || [];
}

module.exports = {
  receipts,
};
