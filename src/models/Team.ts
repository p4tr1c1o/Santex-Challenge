import { DataTypes, Model, } from "sequelize"
import sequelizeDB from "../database/sequelize"


class Team extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) { return }
}

Team.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tla: {
			type: DataTypes.STRING,
		},
		shortName: {
			type: DataTypes.STRING,
		},
		areaName: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: sequelizeDB,
		timestamps: false,
		underscored: true,
	}
)
export default Team
