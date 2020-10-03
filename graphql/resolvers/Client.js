async function receipts(parent, args, context, info) {
  return await context.prisma.client
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
