import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

export class InvalidJWT extends Model<InferAttributes<InvalidJWT>, InferCreationAttributes<InvalidJWT>> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare jwt: string;

	static initModel(sequelize: Sequelize): typeof InvalidJWT {
		return InvalidJWT.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			},

			jwt: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			}
		}, { sequelize });
	}
}