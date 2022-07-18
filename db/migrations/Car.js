import cars from "../mock/cars.json"

// {
//   "title": "car1",
//   "brand": "bmw",
//   "image": {
//     "id": 1,
//     "filename": "/api/image/1657654933622-bezkoder-8d7e6d54.png"
//   },
//   "price": {
//     "one": 10,
//     "two": 20,
//     "third": 30,
//     "fourth": 35
//   }
// },
// {
//   "title": "car2",
//   "brand": "mers",
//   "image": {
//     "id": 2,
//     "filename": ""
//   },
//   "price": {
//     "one": "String2",
//     "two": "String2",
//     "third": "String2",
//     "fourth": "String2"
//   }
// },
// {
//   "title": "car3",
//   "brand": "audi",
//   "image": {
//     "id": 3,
//     "filename": ""
//   },
//   "price": {
//     "one": "String3",
//     "two": "String3",
//     "third": "String3",
//     "fourth": "String3"
//   }
// },
// {
//   "title": "car4",
//   "brand": "beha",
//   "image": {
//     "id": 4,
//     "filename": ""
//   },
//   "price": {
//     "one": "String4",
//     "two": "String4",
//     "third": "String4",
//     "fourth": "String4"
//   }
// }

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
