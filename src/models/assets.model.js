// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const assets = sequelizeClient.define('assets', {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quality: {
      type: DataTypes.ENUM('good', 'mild', 'severe'),
      allowNull: false,
      defaultValue: 'good'
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acquisition_date: {
      type: DataTypes.DATEONLY,
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
    assets.belongsTo(models.types, { onDelete: 'cascade' });
    assets.belongsTo(models.users, { onDelete: 'cascade', as: 'created_by' });
    assets.belongsTo(models.rooms, { onDelete: 'cascade' });
  };

  return assets;
};
