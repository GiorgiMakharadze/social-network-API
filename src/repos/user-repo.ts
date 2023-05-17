import pool from "../pool";
import toCamelCase from "./utils/toCamelCase";

class UserRepo {
  static async find() {
    const { rows }: any = await pool.query("SELECT * FROM users;");

    return toCamelCase(rows);
  }

  static async findById() {}
  static async insert() {}
  static async update() {}
  static async delete() {}
}

export default UserRepo;
