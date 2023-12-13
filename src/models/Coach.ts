import { DataTypes, Model, } from "sequelize"
import sequelizeDB from "../database/sequelize"


class Coach extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) { return }
}

Coach.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
		},
		position: {
			type: DataTypes.STRING,
		},
		dateOfBirth: {
			type: DataTypes.STRING,
		},
		nationality: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: sequelizeDB,
		timestamps: false,
		underscored: true,
	}
)
export default Coach
