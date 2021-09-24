// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const transfers = sequelizeClient.define('transfers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
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
  transfers.associate = function (models) {
    transfers.belongsTo(models.transfer_types, { onDelete: 'cascade' });
    transfers.belongsTo(models.assets, { onDelete: 'cascade' });
    transfers.belongsTo(models.divisions, { onDelete: 'cascade', as: 'from' });
    transfers.belongsTo(models.divisions, { onDelete: 'cascade', as: 'to' });
    transfers.belongsTo(models.users, { onDelete: 'cascade', as: 'created_by' });
    transfers.belongsTo(models.users, { onDelete: 'cascade', as: 'approved_by' });
  };

  return transfers;
};
