const { authenticate } = require('@feathersjs/authentication').hooks;

const populateCreatedBy = require('../../hooks/populate-created-by');

const populateAssetCode = require('../../hooks/populate-asset-code');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [populateCreatedBy(), populateAssetCode()],
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
