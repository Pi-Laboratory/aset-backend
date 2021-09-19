// Initializes the `types` service on path `/types`
const { Types } = require('./types.class');
const createModel = require('../../models/types.model');
const hooks = require('./types.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  const types = new Types(options, app);
  types.docs = {
    description: 'Service untuk entitas pengguna',
    definitions: {
      types_list: {
        $ref: '#/definitions/types'
      },
      types: {
        type: 'object',
        required: [],
        properties: {
          code: {
            type: 'string',
            description: 'Kode tipe'
          },
          name: {
            type: 'string',
            description: 'Nama tipe'
          },
          price: {
            type: 'integer',
            description: 'Harga tipe'
          },
          specifications: {
            type: 'object',
            description: 'Spesifikasi tipe'
          },
          attributes: {
            type: 'object',
            description: 'Atribut tipe'
          }
        }
      }
    }
  };
  app.use('/types', types);

  // Get our initialized service so that we can register hooks
  const service = app.service('types');

  service.hooks(hooks);
};
