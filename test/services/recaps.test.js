const app = require('../../src/app');

describe('\'recaps\' service', () => {
  it('registered the service', () => {
    const service = app.service('recaps');
    expect(service).toBeTruthy();
  });
});
