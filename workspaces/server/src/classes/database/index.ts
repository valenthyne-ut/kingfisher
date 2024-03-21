import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "kingfisher.database",
	define: { underscored: true },
	logging: false
});