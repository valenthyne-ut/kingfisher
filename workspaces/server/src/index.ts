import "dotenv/config";
import config from "./config";
import "@/strategies";

import express from "express";
import cors from "cors";
import { createServer } from "https";
import { logger } from "./classes/Logger";
import chalk from "chalk";
import { setupViewEngine } from "./config/ViewEngine";
import { sequelize } from "./classes/database";
import { initModels } from "./classes/database/models";
import { apiRouter } from "./api";

(async () => {
	initModels(sequelize);
	await sequelize.sync();
	logger.info("Database ready.");

	const app = express();

	app.use(cors({
		origin: `https:/127.0.0.1:${config.PORT}`
	}));

	app.use(express.json());
	app.use("/api", apiRouter);
	
	setupViewEngine(app);

	const httpsServer = createServer(config.CREDENTIALS, app).listen(config.PORT);
	
	httpsServer.on("listening", () => {
		logger.info("Server started.");
		logger.info(`Local: ${chalk.cyan(`https://localhost:${config.PORT}`)}`);
	});
})();