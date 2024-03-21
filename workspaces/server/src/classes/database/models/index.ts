import { Sequelize } from "sequelize";
import { User } from "./User";
import { InvalidJWT } from "./InvalidJWT";
import { logger } from "@/classes/Logger";

export { User, InvalidJWT };

export function initModels(sequelize: Sequelize) {
	logger.info("Preparing database.");
	User.initModel(sequelize);
	InvalidJWT.initModel(sequelize);
}