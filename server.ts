import app from "./src/app";
import "dotenv/config";
import pool from "./src/pool";

const port = process.env.PORT || 3005;

pool
  .connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  })
  .then(() => {
    app().listen(port, () => console.log(`Listening on port: ${port}...`));
  })
  .catch((err) => console.log(err));
