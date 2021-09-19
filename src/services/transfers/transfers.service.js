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
  const transfers = new Transfers(options, app);
  transfers.docs = {
    description: 'Service untuk entitas transfer',
    definitions: {
      transfers_list: {
        $ref: '#/definitions/transfers'
      },
      transfers: {
        type: 'object',
        required: [],
        properties: {
          transfer_type_id: {
            type: 'integer',
            description: 'ID tipe transfer'
          },
          asset_id: {
            type: 'integer',
            description: 'ID aset'
          },
          from_id: {
            type: 'integer',
            description: 'ID divisi asal'
          },
          to_id: {
            type: 'integer',
            description: 'ID divisi tujuan'
          }
        }
      }
    }
  };
  app.use('/transfers', transfers);

  // Get our initialized service so that we can register hooks
  const service = app.service('transfers');

  service.hooks(hooks);
};
