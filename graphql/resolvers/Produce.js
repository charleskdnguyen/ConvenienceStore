async function store(parent, args, context, info) {
  return await context.prisma.produce
    .findOne({
      where: {
        id: parent.id,
      },
    })
    .store();
}

//! When querying through Produce to get the list of receipts containing a produce, an error shows up
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
