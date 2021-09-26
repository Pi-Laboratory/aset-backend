// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const assets = sequelizeClient.define('assets', {
    quantity_good: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    quantity_mild: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    quantity_severe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    assets.belongsTo(models.types, { onDelete: 'cascade' });
    assets.belongsTo(models.users, { onDelete: 'cascade', as: 'created_by' });
    assets.belongsTo(models.rooms, { onDelete: 'cascade' });
  };

  return assets;
};
