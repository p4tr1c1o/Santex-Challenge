import { DataTypes, Model, } from "sequelize"
import sequelizeDB from "../database/sequelize"


class Player extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) { return }
}

Player.init(
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
export default Player
