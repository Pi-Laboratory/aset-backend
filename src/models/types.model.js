// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const types = sequelizeClient.define('types', {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    specifications: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    attributes: {
      type: DataTypes.JSONB,
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
  types.associate = function (models) {
    types.hasMany(models.assets, { onDelete: 'cascade' });
    types.belongsTo(models.users, { onDelete: 'cascade', as: 'created_by' });
  };

  return types;
};
