const app = require('../../src/app');

describe('\'divisions\' service', () => {
  it('registered the service', () => {
    const service = app.service('divisions');
    expect(service).toBeTruthy();
  });
});
