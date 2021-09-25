// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, data, result, params: { user } } = context;
    const assets = app.service('assets');
    const transfers = app.service('transfers');
    const fromAsset = await assets.get(result.asset_id);
    const toAsset = (await assets.find({
      query: {
        type_id: fromAsset.type_id,
        room_id: result.to_id
      }
    })).data[0];
    const qType = result.type;

    if (data.approved) {
      if (toAsset) {
        await assets.patch(toAsset.id, {
          [`quantity_${qType}`]: toAsset[`quantity_${qType}`] + result.quantity
        });
      } else {
        await assets.create({
          room_id: result.to_id,
          [`quantity_${qType}`]: result.quantity,
          type_id: fromAsset.type_id
        });
      }
      await assets.patch(fromAsset.id, {
        [`quantity_${qType}`]: fromAsset[`quantity_${qType}`] - result.quantity
      });
      await transfers.patch(result.id, {
        approved_by_id: user.id
      });
    }

    return context;
  };
};
