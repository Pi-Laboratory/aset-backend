const app = require('../../src/app');

describe('\'transfers\' service', () => {
  it('registered the service', () => {
    const service = app.service('transfers');
    expect(service).toBeTruthy();
  });
});
