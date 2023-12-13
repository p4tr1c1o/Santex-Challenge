import { DataTypes, Model, } from "sequelize"
import sequelizeDB from "../database/sequelize"


class Competition extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) { return }
}

Competition.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			field: "name",
			allowNull: false,
		},
		code: {
			type: DataTypes.STRING,
			field: "code",
		},
		areaCode: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: sequelizeDB,
		timestamps: false,
		underscored: true,
	}
)
export default Competition
