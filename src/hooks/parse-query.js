// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.params.provider === 'rest' || context.params.provider === 'socketio') {
      const sequelize = context.app.get('sequelizeClient');
      const query = context.params.query;
      if (typeof query.$include === 'object') {
        context.params.sequelize = {
          distinct: query.$distinct,
          as: query.$as,
          include: typeof query.$include === 'object' ? query.$include.map((include) => buildIncludes(include, sequelize.models)) : undefined,
          raw: false
        };
        delete context.params.query.$include;
        delete context.params.query.$as;
        delete context.params.query.$distinct;
      }
    }
    if (!context.params.provider)
      delete context.params.sequelize;

    return context;
  };
};

function buildIncludes(m, models) {
  if (m.model === 'users') {
    if (m.$select)
      if (m.$select.indexOf('password') !== -1)
        delete m.$select[m.$select.indexOf('password')];
  }
  const parsed = {
    as: m.$as,
    model: models[m.model],
    attributes: m.$select ? m.$select : { exclude: ['password'] },
    include: typeof m.$include === 'object' ? m.$include.map((include) => buildIncludes(include, models)) : [],
    where: m.where,
    raw: false
  };
  return parsed;
}
