async function store(parent, args, context, info) {
  return context.prisma.produce.findOne({
    where: {
      id: parent.id,
    }
  }).store();
}

module.exports = {
  store,
}
