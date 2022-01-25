const { authenticate } = require('@feathersjs/authentication').hooks;

const populateCreatedBy = require('../../hooks/populate-created-by');

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [authenticate('jwt') , populateCreatedBy()],
    update: [authenticate('jwt') ],
    patch: [authenticate('jwt') ],
    remove: [authenticate('jwt') ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
