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
        A.origin,
        A.acquisition_date,
        A.type_id,
        T.NAME AS TYPE,
        ( SELECT COUNT ( * ) FROM assets WHERE NAME = A.NAME AND acquisition_date = A.acquisition_date AND type_id = A.type_id AND quality = 'good' ) good,
        ( SELECT COUNT ( * ) FROM assets WHERE NAME = A.NAME AND acquisition_date = A.acquisition_date AND type_id = A.type_id AND quality = 'mild' ) mild,
        ( SELECT COUNT ( * ) FROM assets WHERE NAME = A.NAME AND acquisition_date = A.acquisition_date AND type_id = A.type_id AND quality = 'severe' ) severe 
      FROM
        assets
        A LEFT JOIN types T ON A.type_id = T.ID 
      GROUP BY
        T.code,
        T.NAME,
        A.origin,
        A.NAME,
        A.acquisition_date,
        A.type_id;
    `, { type: sequelize.Sequelize.QueryTypes.SELECT });
    console.log(result);
    return result;
  }
};
