import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes, NonAttribute, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCreateAssociationMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, Association } from "sequelize";
import { Upload } from "./Upload";

type UserAssociations = "uploads";

export class User extends Model<
	InferAttributes<User, { omit: UserAssociations }>, 
	InferCreationAttributes<User, { omit: UserAssociations }>
> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare username: string;
	declare password: string;

	declare uploads?: NonAttribute<Upload[]>;
	declare getUploads: HasManyGetAssociationsMixin<Upload>;
	declare addUpload: HasManyAddAssociationMixin<Upload, string>;
	declare addUploads: HasManyAddAssociationsMixin<Upload, string>;
	declare createUpload: HasManyCreateAssociationMixin<Upload>;
	declare removeUpload: HasManyRemoveAssociationMixin<Upload, string>;
	declare removeUploads: HasManyRemoveAssociationsMixin<Upload, string>;
	declare hasUpload: HasManyHasAssociationMixin<Upload, string>;
	declare hasUploads: HasManyHasAssociationsMixin<Upload, string>;
	declare countUploads: HasManyCountAssociationsMixin;

	declare static associations: { 
		uploads: Association<User, Upload>;
	};

	static initModel(sequelize: Sequelize): typeof User {
		return User.init({
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

			username: {
				type: DataTypes.TEXT,
				unique: true,
				allowNull: false
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: false
			}
		}, { sequelize });
	}
}