// Initializes the `transfers` service on path `/transfers`
const { Transfers } = require('./transfers.class');
const createModel = require('../../models/transfers.model');
const hooks = require('./transfers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/transfers', new Transfers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transfers');

  service.hooks(hooks);
};
