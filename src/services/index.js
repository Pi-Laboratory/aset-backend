const users = require('./users/users.service.js');
const divisions = require('./divisions/divisions.service.js');
const types = require('./types/types.service.js');
const assets = require('./assets/assets.service.js');
const transfers = require('./transfers/transfers.service.js');
const transferTypes = require('./transfer_types/transfer_types.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(divisions);
  app.configure(types);
  app.configure(assets);
  app.configure(transfers);
  app.configure(transferTypes);
};
