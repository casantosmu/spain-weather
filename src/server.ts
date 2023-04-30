import express from "express";
import logger, { httpLogger } from "./logger";
import router from "./router";
import { type Server } from "http";
import { config } from "./config";
import { generalErrorMiddleware, notFoundMiddleware } from "./middlewares";

const app = express();

app.use(httpLogger);
app.disable("x-powered-by");

app.use("/api/v1", router);

app.use(notFoundMiddleware);
app.use(generalErrorMiddleware);

let server: Server | undefined;

export const startServer = async () =>
  new Promise<void>((resolve, reject) => {
    server = app.listen(config.serverPort, () => {
      logger.info(`Server is running at http://localhost:${config.serverPort}`);
      resolve();
    });

    server.once("error", (error) => {
      reject(error);
    });
  });

export const stopServer = (cb: () => void) => {
  if (server) {
    server.close(() => {
      logger.info("HTTP server closed");
      cb();
    });
    return;
  }

  cb();
};
