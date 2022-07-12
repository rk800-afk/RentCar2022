const cars = require('../mock/cars.json')

module.exports = {
  async up(db) {
    try {
    await db
        .collection('cars')
        .insertMany(cars);
    } catch (e) {
      console.log(e.message);
    }
  },

  async down(db) {
    try {
    await db
        .collection('cars')
        .deleteMany();
    } catch (e) {
      console.log(e.message);
    }
  }
};
