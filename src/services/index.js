const users = require('./users/users.service.js');
const rooms = require('./rooms/rooms.service.js');
const types = require('./types/types.service.js');
const assets = require('./assets/assets.service.js');
const transfers = require('./transfers/transfers.service.js');
const transferTypes = require('./transfer_types/transfer_types.service.js');
const majors = require('./majors/majors.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(rooms);
  app.configure(types);
  app.configure(assets);
  app.configure(transfers);
  app.configure(transferTypes);
  app.configure(majors);
};
