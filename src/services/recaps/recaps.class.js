/* eslint-disable no-unused-vars */
exports.Recaps = class Recaps {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    const sequelize = this.app.get('sequelizeClient');
    console.log(sequelize);
    const result = await sequelize.query(`
      SELECT T
        .code,
        A.NAME,
        A.type_id,
        A.room_id,
        T.NAME AS TYPE,
        R.name AS room,
        ( SELECT COUNT ( * ) FROM assets WHERE NAME = A.NAME AND type_id = A.type_id AND A.room_id = R.id AND quality = 'good' ) good,
        ( SELECT COUNT ( * ) FROM assets WHERE NAME = A.NAME AND type_id = A.type_id AND A.room_id = R.id AND quality = 'mild' ) mild,
        ( SELECT COUNT ( * ) FROM assets WHERE NAME = A.NAME AND type_id = A.type_id AND A.room_id = R.id AND quality = 'severe' ) severe 
      FROM
        assets
        A LEFT JOIN types T ON A.type_id = T.ID 
        LEFT JOIN rooms R ON A.room_id = R.id
      GROUP BY
        T.code,
        T.NAME,
        A.room_id,
        A.NAME,
        A.type_id,
        R.name,
        R.id;
    `, { type: sequelize.Sequelize.QueryTypes.SELECT });
    console.log(result);
    return result;
  }
};
