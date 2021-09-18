const app = require('../../src/app');

describe('\'assets\' service', () => {
  it('registered the service', () => {
    const service = app.service('assets');
    expect(service).toBeTruthy();
  });
});
