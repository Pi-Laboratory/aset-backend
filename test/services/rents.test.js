const app = require('../../src/app');

describe('\'rents\' service', () => {
  it('registered the service', () => {
    const service = app.service('rents');
    expect(service).toBeTruthy();
  });
});
