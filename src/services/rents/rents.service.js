// Initializes the `rents` service on path `/rents`
const { Rents } = require('./rents.class');
const createModel = require('../../models/rents.model');
const hooks = require('./rents.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  const rents = new Rents(options, app);
  rents.docs = {
    description: 'Service untuk entitas sewaan',
    definitions: {
      'rents_list': {
        $ref: '#/definitions/rents'
      },
      rents: {
        type: 'object',
        required: [],
        properties: {
          name: {
            type: 'string',
            description: 'Nama Ruang'
          },
          from_date: {
            type: 'string',
            description: 'Tanggal Mulai Sewa'
          },
          to_date: {
            type: 'string',
            description: 'Tanggal Selesai Sewa'
          }
        }
      }
    }
  };
  app.use('/rents', rents);

  // Get our initialized service so that we can register hooks
  const service = app.service('rents');

  service.hooks(hooks);
};
