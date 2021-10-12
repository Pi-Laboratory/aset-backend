// Initializes the `majors` service on path `/majors`
const { Majors } = require('./majors.class');
const createModel = require('../../models/majors.model');
const hooks = require('./majors.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };
  const majors = new Majors(options, app);
  majors.docs = {
    description: 'Service untuk entitas jurusan',
    definitions: {
      'majors_list': {
        $ref: '#/definitions/majors'
      },
      majors: {
        type: 'object',
        required: [],
        properties: {
          code: {
            type: 'string',
            description: 'Kode jurusan'
          },
          name: {
            type: 'string',
            description: 'Nama jurusan'
          }
        }
      }
    }
  };
  // Initialize our service with any options it requires
  app.use('/majors', majors);

  // Get our initialized service so that we can register hooks
  const service = app.service('majors');

  service.hooks(hooks);
};
