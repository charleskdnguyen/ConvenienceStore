const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getClientId } = require('../../src/utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const client = await context.prisma.client.create({
    data: {
      first_name: args.first_name,
      last_name: args.last_name,
      age: args.age,
      email: args.email,
      phone: args.phone,
      password: password,
      receipts: args.receipts,
    }
  });

  const token = jwt.sign({
    clientId: client.id,
  }, APP_SECRET);

  context.pubsub.publish("NEW_CLIENT", client);

  return {
    token,
    client,
  };
}

async function login(parent, args, context, info) {
  const client = await context.prisma.client.findOne({
    where: {
      email: args.email,
    },
  });

  if (!client) throw new Error(`No such user found!`);

  const valid = await bcrypt.compare(args.password, client.password);

  if (!valid) throw new Error(`Invalid password!`);

  const token = jwt.sign({
    clientId: client.id
  }, APP_SECRET);

  return {
    token,
    client,
  };
}

async function addOwner(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const owner = await context.prisma.owner.create({
    data: {
      first_name: args.first_name,
      last_name: args.last_name,
      age: args.age,
      email: args.email,
      phone: args.phone,
      password: password,
      storeowned: {
        connect: {
          id: args.storeownedId,
        }
      },
    }
  });

  context.pubsub.publish("NEW_OWNER", owner);

  return owner;
}

async function deleteOwner(parent, args, context, info) {
  return await context.prisma.owner.delete({
    where: {
      id: Number(args.id),
    },
  });
}

async function updateOwner(parent, args, context, info) {
  const clientId = getClientId(context);

  const foundOwner = await context.prisma.owner.findOne({
    where: {
      id: Number(args.ownerid)
    }
  });

  if (!foundOwner) throw new Error(`Owner with id ${args.id} not found.`);

  return await context.prisma.owner.update({
    where: {
      id: Number(args.ownerid),
    },
    data: {
      first_name:
        foundOwner.first_name === args.first_name
          ? foundOwner.first_name
          : args.first_name,
      last_name:
        foundOwner.last_name === args.last_name
          ? foundOwner.last_name
          : args.last_name,
      email: foundOwner.email === args.email ? foundOwner.email : args.email,
      age: foundOwner.age === args.age ? foundOwner.age : args.age,
      phone: foundOwner.phone === args.phone ? foundOwner.phone : args.phone,
    },
  });
}

async function deleteClient(parent, args, context, info) {
  return await context.prisma.client.delete({
    where: {
      id: Number(args.id),
    },
  });
}

async function updateClient(parent, args, context, info) {
  const clientId = getClientId(context);

  const foundUser = await context.prisma.client.findOne({
    where: {
      id: Number(clientId),
    },
  });

  if (!foundUser) throw new Error(`No user found!`);

  return await context.prisma.client.update({
    where: {
      id: clientId,
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
      password: foundUser.password === args.password ? foundUser.password : args.password,
    },
  });
}

async function addProduce(parent, args, context, info) {
  const produce = await context.prisma.produce.create({
    data: {
      name: args.name,
      quantity: args.quantity,
      price: args.price,
      foodtype: args.foodtype,
      store: {
        connect: {
          id: args.storeid,
        }
      }
    },
  });

  context.pubsub.publish("NEW_PRODUCE", produce);

  return produce;
}

async function deleteProduce(parent, args, context, info) {
  return await context.prisma.produce.delete({
    where: {
      id: Number(args.id),
    },
  });
}

async function updateProduce(parent, args, context, info) {
  const foundProduce = await context.prisma.produce.findOne({
    where: {
      id: Number(args.id),
    },
  });

  if (!foundProduce) throw new Error(`Produce with id ${args.id} not found.`);

  return await context.prisma.produce.update({
    where: {
      id: Number(args.id),
    },
    data: {
      quantity: foundProduce.quantity === args.quantity ? foundProduce.quantity : args.quantity,
      price: foundProduce.price === args.price ? foundProduce.price : args.price,
    },
  });
}

async function addStore(parent, args, context, info) {
  const store = await context.prisma.store.create({
    data: {
      name: args.name,
      address: args.address,
      email: args.email,
      phone: args.phone,
      storeowner: args.storeowner,
      city: args.city,
      province: args.province,
    },
  });

  context.pubsub.publish("NEW_STORE", store);

  return store;
}

async function deleteStore(parent, args, context, info) {
  return await context.prisma.store.delete({
    where: {
      id: Number(args.id),
    }
  });
}

async function updateStore(parent, args, context, info) {
  const foundStore = await context.prisma.store.findOne({
    where: {
      id: Number(args.id),
    },
  });

  if (!foundStore) throw new Error(`Store with id ${args.id} not found.`);

  return await context.prisma.store.update({
    where: {
      id: Number(args.id),
    },
    data: {
      name: foundStore.name === args.name ? foundStore.name : args.name,
      address:
        foundStore.address === args.address ? foundStore.address : args.address,
      email: foundStore.email === args.email ? foundStore.email : args.email,
      storeowner:
        foundStore.storeowner === args.storeowner
          ? foundStore.storeowner
          : args.storeowner,
      city: foundStore.city === args.city ? foundStore.city : args.city,
      province:
        foundStore.province === args.province
          ? foundStore.province
          : args.province,
      phone:
        foundStore.phone === args.phone
          ? foundStore.phone
          : args.phone,
    },
  });
}

async function addReceipt(parent, args, context, info) {
  const clientId = getClientId(context);

  const mappedIds = await args.produces.map(produce => {
    return { id: produce };
  });

  const receipt =  await context.prisma.receipt.create({
    data: {
      subtotal: args.subtotal,
      total: args.total,
      client: {
        connect: {
          id: clientId,
        }
      },
      store: {
        connect: {
          id: args.storeid,
        }
      },
      produces: {
        connect: mappedIds,
      },
    },
  });

  context.pubsub.publish("NEW_RECEIPT", receipt);

  return receipt;
}

async function deleteReceipt(parent, args, context, info) {
  return await context.prisma.receipt.delete({
    where: {
      id: Number(args.id),
    }
  });
}

async function updateReceipt(parent, args, context, info) {
  const foundReceipt = await context.prisma.receipt.findOne({
    where: {
      id: Number(args.id),
    },
  });

  if (!foundReceipt) throw new Error(`Receipt with id ${args.id} not found.`);

  return await context.prisma.receipt.update({
    where: {
      id: Number(args.id),
    },
    data: {
      subtotal: foundReceipt.subtotal === args.subtotal ? foundReceipt.subtotal : args.subtotal,
      total: foundReceipt.total === args.total ? foundReceipt.total : args.total,
    },
  });
}

module.exports = {
  signup,
  login,
  addOwner,
  deleteOwner,
  updateOwner,
  deleteClient,
  updateClient,
  addProduce,
  deleteProduce,
  updateProduce,
  addStore,
  deleteStore,
  updateStore,
  addReceipt,
  updateReceipt,
  deleteReceipt,
};
