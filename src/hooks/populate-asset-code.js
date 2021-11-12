// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const moment = require('moment');
require('moment/locale/id');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, data } = context;
    const assets = await app.service('assets').find({
      query: {
        $limit: 1,
        $sort: {
          id: -1
        },
        type_id: data.type_id,
//        room_id: data.room_id
      }
    });
    const type = await app.service('types').get(data.type_id);
    const room = await app.service('rooms').get(data.room_id);
    const major = await app.service('majors').get(room.major_id);

    const seq = assets.data[0] ? assets.data[0].id + 1 : 1;
    context.data.code = type.format
      .replace('{type}', type.code)
      .replace('{mon}', moment().format('MMM').toUpperCase())
      .replace('{year}', moment().format('YYYY'))
      .replace('{room}', room.code)
      .replace('{major}', major.code)
      .replace('{seq}', pad(seq, 4));

    return context;
  };
};

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
}
