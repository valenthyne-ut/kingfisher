import { Sequelize } from "sequelize";
import { User } from "./User";
import { InvalidJWT } from "./InvalidJWT";
import { logger } from "@/classes/Logger";
import { Upload } from "./Upload";

export { User, InvalidJWT, Upload };

export function initModels(sequelize: Sequelize) {
	logger.info("Preparing database.");
	User.initModel(sequelize);
	InvalidJWT.initModel(sequelize);
	Upload.initModel(sequelize);

	User.hasMany(Upload, {
		as: "uploads",
		foreignKey: "user_id"
	});

	Upload.hasOne(User, {
		as: "startedBy",
		foreignKey: "upload_id"
	});
}