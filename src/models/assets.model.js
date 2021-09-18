// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const assets = sequelizeClient.define('assets', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  assets.associate = function (models) {
    assets.belongsTo(models.users, { onDelete: 'cascade', as: 'created_by' });
    assets.belongsTo(models.divisions, { onDelete: 'cascade' });
  };

  return assets;
};
