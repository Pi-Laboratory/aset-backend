// Initializes the `sequences` service on path `/sequences`
const { Sequences } = require('./sequences.class');
const createModel = require('../../models/sequences.model');
const hooks = require('./sequences.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sequences', new Sequences(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sequences');

  service.hooks(hooks);
};
