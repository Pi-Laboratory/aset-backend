// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const moment = require('moment');
require('moment/locale/id');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, data, result, params: { user } } = context;
    const asset = await app.service('assets').get(result.asset_id);
    const type = await app.service('types').get(asset.type_id);
    const room = await app.service('rooms').get(result.to_id);
    const major = await app.service('majors').get(room.major_id);

    const assets = await app.service('assets').find({
      query: {
        $limit: 1,
        $sort: {
          id: -1
        },
        type_id: type.id
      }
    });
    const seq = assets.data[0] ? assets.data[0].id + 1 : 1;
    if (data.approved) {
      await app.service('assets').patch(result.asset_id, {
        room_id: result.to_id,
        code: type.format
          .replace('{type}', type.code)
          .replace('{mon}', moment(asset.created_at).format('MMM').toUpperCase())
          .replace('{year}', moment(asset.created_at).format('YYYY'))
          .replace('{room}', room.code)
          .replace('{major}', major.code)
          .replace('{seq}', pad(seq, 4))
      });
      await app.service('transfers').patch(result.id, {
        approved_by_id: user.id
      });
    }

    return context;
  };
};

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
}
