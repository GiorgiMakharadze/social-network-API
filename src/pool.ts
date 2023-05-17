import pg, { PoolConfig } from "pg";

class CustomPool {
  _pool: pg.Pool | null = null;

  connect(options: PoolConfig) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1+1;");
  }
}

export default new CustomPool();
