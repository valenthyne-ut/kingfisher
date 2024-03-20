import "dotenv/config";
import config from "./config";

import express from "express";
import cors from "cors";
import { createServer } from "https";
import { logger } from "./classes/Logger";
import chalk from "chalk";

(async () => {
	const app = express();

	app.use(cors({
		origin: `https:/127.0.0.1:${config.PORT}`
	}));

	const httpsServer = createServer(config.CREDENTIALS, app).listen(config.PORT);
	
	httpsServer.on("listening", () => {
		logger.info("Server started.");
		logger.info(`Local: ${chalk.cyan(`https://localhost:${config.PORT}`)}`);
	});
})();