async function addClient(parent, args, context, info) {
  return await context.prisma.client.create({
    data: {
      first_name: args.first_name,
      last_name: args.last_name,
      age: args.age,
      email: args.email,
      phone: args.phone,
    },
  });
}

async function deleteClient(parent, args, context, info) {
  try {
    return await context.prisma.client.delete({
      where: {
        id: Number(args.id),
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function updateClient(parent, args, context, info) {
  const foundUser = await context.prisma.client.findOne({
    where: {
      id: Number(args.id),
    },
  });
  return await context.prisma.client.update({
    where: {
      id: Number(args.id),
    },
    data: {
      first_name:
        foundUser.first_name === args.first_name
          ? foundUser.first_name
          : args.first_name,
      last_name:
        foundUser.last_name === args.last_name
          ? foundUser.last_name
          : args.last_name,
      email: foundUser.email === args.email ? foundUser.email : args.email,
      age: foundUser.age === args.age ? foundUser.age : args.age,
      phone: foundUser.phone === args.phone ? foundUser.phone : args.phone,
    },
  });
}



module.exports = {
  addClient,
  deleteClient,
  updateClient,
};
