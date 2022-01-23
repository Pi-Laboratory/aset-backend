// Initializes the `rent-list` service on path `/rent-list`
const { RentList } = require('./rent-list.class');
const createModel = require('../../models/rent-list.model');
const hooks = require('./rent-list.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  const rentList = new RentList(options, app);
  rentList.docs = {
    description: 'Service untuk entitas daftar sewa',
    definitions: {
      'rent-list_list': {
        $ref: '#/definitions/rent-list'
      },
      rent_list: {
        type: 'object',
        required: [],
        properties: {
          price: {
            type: 'integer',
            description: 'Harga sewa'
          },
          rent_id: {
            type: 'integer',
            description: 'ID sewaan'
          },
          asset_id: {
            type: 'integer',
            description: 'ID aset'
          }
        }
      }
    }
  };
  app.use('/rent-list', rentList);

  // Get our initialized service so that we can register hooks
  const service = app.service('rent-list');

  service.hooks(hooks);
};
