// Initializes the `assets` service on path `/assets`
const { Assets } = require('./assets.class');
const createModel = require('../../models/assets.model');
const hooks = require('./assets.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  const assets = new Assets(options, app);
  assets.docs = {
    description: 'Service untuk entitas divisi',
    definitions: {
      assets_list: {
        $ref: '#/definitions/assets'
      },
      assets: {
        type: 'object',
        required: [],
        properties: {
          quality: {
            type: 'string',
            description: 'Keadaan (good, mild, severe)'
          },
          price: {
            type: 'integer',
            description: 'Harga',
          },
          name: {
            type: 'string',
            description: 'Nama aset'
          },
          origin: {
            type: 'string',
            description: 'Asal perolehan'
          },
          acquisition_date: {
            type: 'string',
            description: 'Tanggal perolehan'
          },
          room_id: {
            type: 'integer',
            description: 'ID divisi'
          },
          type_id: {
            type: 'integer',
            description: 'ID tipe'
          },
          created_by_id: {
            type: 'integer',
            description: 'ID pengguna pembuat'
          }
        }
      }
    }
  };
  app.use('/assets', assets);

  // Get our initialized service so that we can register hooks
  const service = app.service('assets');

  service.hooks(hooks);
};
