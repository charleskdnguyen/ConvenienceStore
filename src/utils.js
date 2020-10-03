const jwt = require('jsonwebtoken');
const APP_SECRET = 'This-is-a-convienice-app-created-in-2020';

function getClientId(context) {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { clientId } = jwt.verify(token, APP_SECRET);

    return clientId;
  }

  throw new Error(`Client is not authenticated!`);
}

module.exports = {
  getClientId,
  APP_SECRET,
}
