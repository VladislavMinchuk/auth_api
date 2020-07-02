const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

module.exports = async (app) => {
  try {
    // Mongoose connectioin
    await mongooseLoader();
    console.log('Database connected!');

    // Express loaders
    expressLoader(app);
  } catch (err) {
    console.log(err);
  }
};