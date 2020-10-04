async function storeowned(parent, args, context, info) {
  return await context.prisma.owner
    .findOne({
      where: {
        id: parent.id,
      }
    })
    .storeowned();
}

module.exports = {
  storeowned,
};

