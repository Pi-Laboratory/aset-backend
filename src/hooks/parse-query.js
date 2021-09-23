// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const sequelize = context.app.get('sequelizeClient');
    const query = context.params.query;
    context.params.sequelize = {
      include: typeof query.$include === 'object' ? query.$include.map((include) => buildIncludes(include, sequelize.models)) : [],
      raw: false
    };
    delete context.params.query.$include;
    return context;
  };
};

function buildIncludes(m, models) {
  if (m.model === 'users') {
    if (m.$select.indexOf('password') !== -1)
      delete m.$select[m.$select.indexOf('password')];
  }
  const parsed = {
    model: models[m.model],
    attributes: m.$select,
    include: typeof m.$include === 'object' ? m.$include.map((include) => buildIncludes(include, models)) : [],
    raw: false
  };
  return parsed;
}
