const app = require('../../src/app');

describe('\'types\' service', () => {
  it('registered the service', () => {
    const service = app.service('types');
    expect(service).toBeTruthy();
  });
});
