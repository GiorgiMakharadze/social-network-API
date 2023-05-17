import pool from "../pool";
import toCamelCase from "./utils/toCamelCase";

interface IUser {
  id: number;
  username: string;
  bio: string;
  count: any;
}

class UserRepo {
  static async find() {
    const result = await pool.query("SELECT * FROM users;");

    const { rows }: { rows: IUser[] } = result || { rows: [] };

    return toCamelCase(rows);
  }

  static async findById(id: string) {
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
  static async update(id: string, username: string, bio: string) {
    const result = await pool.query(
      `
      UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;
    `,
      [username, bio, id]
    );

    const { rows }: { rows: IUser[] } = result || { rows: [] };

    return toCamelCase(rows)[0];
  }
  static async delete(id: string) {
    const result = await pool.query(
      `
      DELETE FROM users WHERE id = $1;
    `,
      [id]
    );
    const { rows }: { rows: IUser[] } = result || { rows: [] };
    return toCamelCase(rows)[0];
  }

  static async count() {
    const result = await pool.query("SELECT COUNT(*) FROM users;");
    const { rows }: { rows: IUser[] } = result || { rows: [] };

    return rows[0].count;
  }
}

export default UserRepo;
