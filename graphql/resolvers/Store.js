async function receipts(parent, args, context, info) {
  return await context.prisma.store
    .findMany({
      where: {
        id: Number(parent.id),
      },
    })
    .receipts();
}

module.exports = {
  receipts,
};
