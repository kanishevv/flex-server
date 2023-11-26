/**
 * insert
 *
 * @param {*} model
 * @param {*} data
 */
export const insert = async (model, data) => {
  try {
    // If you don't need mongoose hooks
    // await model.insertMany(data);
    // For being able to use mongoose hooks
    for (const x of data) {
      const exists = await model.exists({
        $or: [
          {
            _id: x._id
          },
          {
            code: x.code
          }
        ]
      });

      if (exists) {
        await model.updateOne({ _id: x._id }, x);
        console.log('->Seed Update Success: ', model.collection.collectionName);
      } else {
        await model.create(x);
        console.log('->Seed Create Success: ', model.collection.collectionName);
      }
    }
  } catch (error) {
    console.error(new Error(error));
  }
};
