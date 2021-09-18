const app = require('../../src/app');

describe('\'transfer_types\' service', () => {
  it('registered the service', () => {
    const service = app.service('transfer-types');
    expect(service).toBeTruthy();
  });
});
