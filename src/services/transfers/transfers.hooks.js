const { authenticate } = require('@feathersjs/authentication').hooks;

const transferAsset = require('../../hooks/transfer-asset');

const populateCreatedBy = require('../../hooks/populate-created-by');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [populateCreatedBy()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [transferAsset()],
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
