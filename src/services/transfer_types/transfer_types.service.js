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
  const transferTypes = new TransferTypes(options, app);
  transferTypes.docs = {
    description: 'Service untuk entitas tipe transfer',
    definitions: {
      'transfer-types_list': {
        $ref: '#/definitions/transfer_types'
      },
      transfer_types: {
        type: 'object',
        required: [],
        properties: {
          name: {
            type: 'string',
            description: 'Nama tipe transfer'
          }
        }
      }
    }
  };
  app.use('/transfer-types', transferTypes);

  // Get our initialized service so that we can register hooks
  const service = app.service('transfer-types');

  service.hooks(hooks);
};
