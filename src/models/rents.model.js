// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const rents = sequelizeClient.define('rents', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  rents.associate = function (models) {
    rents.hasMany(models.rent_list, { onDelete: 'cascade' });
    rents.belongsTo(models.users, { onDelete: 'cascade', as: 'verified_by' });
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return rents;
};
