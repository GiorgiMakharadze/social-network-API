import pool from "../pool";
import toCamelCase from "./utils/toCamelCase";

interface IUser {
  id: number;
  username: string;
  bio: string;
}

class UserRepo {
  static async find() {
    const result = await pool.query("SELECT * FROM users;");

    const { rows }: { rows: IUser[] } = result || { rows: [] };

    return toCamelCase(rows);
  }

  static async findById(id: number) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);

    const { rows }: { rows: IUser[] } = result || { rows: [] };

    return toCamelCase(rows)[0];
  }

  static async insert(username: string, bio: string) {
    const result = await pool.query(
      "INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;",
      [username, bio]
    );

    const { rows }: { rows: IUser[] } = result || { rows: [] };

    return toCamelCase(rows)[0];
  }
  static async update() {}
  static async delete() {}
}

export default UserRepo;
