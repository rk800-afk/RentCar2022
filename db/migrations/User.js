import bcrypt from "bcryptjs"
import admin from "../mock/users.json"

module.exports = {
  async up(db) {
    try {
      // How many rounds bcrypt should hash password (2^round - 2 involution to power rounds)
      const salt = bcrypt.genSaltSync(10);

      // Create admin with email and hashed password
      const user = {
        ...admin,
        password: bcrypt.hashSync("12345678", salt),
      };

      await db
        .collection('users')
        .insertOne(user);
    } catch (e) {
      console.log(e.message);
    }
  },

  async down(db) {
    try {
      await db
        .collection('users')
        .deleteMany();
    } catch (e) {
      console.log(e.message);
    }
  }
};