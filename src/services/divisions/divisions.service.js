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
  const divisions = new Divisions(options, app);
  divisions.docs = {
    description: 'Service untuk entitas divisi',
    definitions: {
      'transfer-types_list': {
        $ref: '#/definitions/divisions'
      },
      divisions: {
        type: 'object',
        required: [],
        properties: {
          name: {
            type: 'string',
            description: 'Nama divisi'
          }
        }
      }
    }
  };
  app.use('/divisions', divisions);

  // Get our initialized service so that we can register hooks
  const service = app.service('divisions');

  service.hooks(hooks);
};
