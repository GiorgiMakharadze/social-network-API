import pg, { PoolConfig } from "pg";

class CustomPool {
  _pool: pg.Pool | null = null;

  connect(options: PoolConfig) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1+1;");
  }

  close() {
    return this._pool?.end();
  }

  query(sql: string) {
    return this._pool?.query(sql);
  }
}

export default new CustomPool();
