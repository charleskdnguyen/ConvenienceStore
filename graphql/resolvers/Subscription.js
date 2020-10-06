function newClientSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_CLIENT");
}

const newClient = {
  subscribe: newClientSubscribe,
  resolve: payload => {
    return payload;
  },
}

function newOwnerSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_OWNER");
}

const newOwner = {
  subscribe: newOwnerSubscribe,
  resolve: payload => {
    return payload;
  },
}

function newProduceSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_PRODUCE");
}
const newProduce = {
  subscribe: newProduceSubscribe,
  resolve: payload => {
    return payload;
  },
}

newStoreSubscribe = (parent, args, context, info) =>
  context.pubsub.asyncIterator("NEW_STORE");

const newStore = {
  subscribe: newStoreSubscribe,
  resolve: payload => {
    return payload;
  },
}

newReceiptSubscribe = (parent, args, context, info) =>
  context.pubsub.asyncIterator("NEW_RECEIPT");

newReceipt = {
  subscribe: newReceiptSubscribe,
  resolve: payload => {
    return payload;
  },
}

module.exports = {
  newClient,
  newProduce,
  newOwner,
  newStore,
  newReceipt,
}
