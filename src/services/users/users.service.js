// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  const users = new Users(options, app);
  users.docs = {
    description: 'Service untuk entitas pengguna',
    definitions: {
      users_list: {
        $ref: '#/definitions/users'
      },
      users: {
        type: 'object',
        required: [],
        properties: {
          username: {
            type: 'string',
            description: 'Username pengguna'
          },
          password: {
            type: 'string',
            description: 'Password pengguna'
          },
          type: {
            type: 'string',
            description: 'Tipe pengguna'
          }
        }
      }
    }
  };
  app.use('/users', users);

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
