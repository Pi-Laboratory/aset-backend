const app = require('../../src/app');

describe('\'sequences\' service', () => {
  it('registered the service', () => {
    const service = app.service('sequences');
    expect(service).toBeTruthy();
  });
});
