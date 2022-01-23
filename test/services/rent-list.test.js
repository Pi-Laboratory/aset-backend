const app = require('../../src/app');

describe('\'rent-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('rent-list');
    expect(service).toBeTruthy();
  });
});
