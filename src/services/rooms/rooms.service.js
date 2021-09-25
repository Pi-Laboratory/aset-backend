// Initializes the `divisions` service on path `/divisions`
const { Rooms } = require('./rooms.class');
const createModel = require('../../models/rooms.model');
const hooks = require('./rooms.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  const rooms = new Rooms(options, app);
  rooms.docs = {
    description: 'Service untuk entitas ruangan',
    definitions: {
      'rooms_list': {
        $ref: '#/definitions/rooms'
      },
      rooms: {
        type: 'object',
        required: [],
        properties: {
          name: {
            type: 'string',
            description: 'Nama Ruang'
          },
          major_id: {
            type: 'integer',
            description: 'ID jurusan'
          }
        }
      }
    }
  };
  app.use('/rooms', rooms);

  // Get our initialized service so that we can register hooks
  const service = app.service('rooms');

  service.hooks(hooks);
};
