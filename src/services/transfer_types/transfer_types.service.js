// Initializes the `transfer_types` service on path `/transfer-types`
const { TransferTypes } = require('./transfer_types.class');
const createModel = require('../../models/transfer_types.model');
const hooks = require('./transfer_types.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/transfer-types', new TransferTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transfer-types');

  service.hooks(hooks);
};
