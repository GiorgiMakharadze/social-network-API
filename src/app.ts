import express from "express";
import "express-async-errors";
import usersRouter from "./routes/users";
import { notFoundMiddleware, errorHandlerMiddleware } from "../middleware";

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(usersRouter);

  // error handling
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};

export default createApp;
