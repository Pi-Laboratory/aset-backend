// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const sequelize = context.app.get('sequelizeClient');
    const from = await sequelize.models.rooms.findOne({
      where: { id: context.data.from_id },
      include: [{
        model: sequelize.models.majors
      }]
    });
    const to = await sequelize.models.rooms.findOne({
      where: { id: context.data.to_id },
      include: [{
        model: sequelize.models.majors
      }]
    });

    context.data.approved = from.major.id === to.major.id;

    return context;
  };
};
