import { Association, CreationOptional, DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { User } from "./User";

type UploadAssociations = "startedBy";

export class Upload extends Model<
	InferAttributes<Upload, { omit: UploadAssociations }>, 
	InferCreationAttributes<Upload, { omit: UploadAssociations }>
> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare identifier: string;
	declare filename: string;
	declare filesize: number;
	declare filehash: string;
	declare path: string;

	declare startedBy?: NonAttribute<User>;
	declare getStartedBy: HasOneGetAssociationMixin<User>;
	declare createStartedBy: HasOneCreateAssociationMixin<User>;

	declare static associations: {
		startedBy: Association<Upload, User>
	};

	static initModel(sequelize: Sequelize): typeof Upload {
		return Upload.init({
			id: {
				type: DataTypes.NUMBER,
				autoIncrement: true
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			},

			identifier: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			filename: {
				type: DataTypes.STRING,
				allowNull: false
			},
			filesize: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			filehash: {
				type: DataTypes.STRING,
				allowNull: false
			},
			path: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}, { sequelize });
	}
}