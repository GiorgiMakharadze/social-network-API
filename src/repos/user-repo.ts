import pool from "../pool";

class UserRepo {
  static async find() {
    const { rows }: any = await pool.query("SELECT * FROM users;");

    return rows;
  }

  static async findById() {}
  static async insert() {}
  static async update() {}
  static async delete() {}
}

export default UserRepo;
