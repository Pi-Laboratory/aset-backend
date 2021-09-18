// Initializes the `divisions` service on path `/divisions`
const { Divisions } = require('./divisions.class');
const createModel = require('../../models/divisions.model');
const hooks = require('./divisions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/divisions', new Divisions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('divisions');

  service.hooks(hooks);
};
