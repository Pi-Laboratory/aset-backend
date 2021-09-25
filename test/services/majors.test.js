const app = require('../../src/app');

describe('\'majors\' service', () => {
  it('registered the service', () => {
    const service = app.service('majors');
    expect(service).toBeTruthy();
  });
});
