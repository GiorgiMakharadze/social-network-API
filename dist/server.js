"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
require("dotenv/config");
const pool_1 = __importDefault(require("./src/pool"));
const port = process.env.PORT || 3005;
pool_1.default
    .connect({
    host: "localdadadadhost",
    port: 5432,
    database: "socialnetwork",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
})
    .then(() => {
    (0, app_1.default)().listen(port, () => console.log(`Listening on port: ${port}...`));
})
    .catch((err) => console.log(err));
