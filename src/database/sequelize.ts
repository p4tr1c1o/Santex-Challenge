import { Sequelize } from "sequelize"

const sequelizeDB = new Sequelize("sqlite::memory:", {
	logging: false
})


sequelizeDB
	.authenticate()
	.then(() => {
		console.info("The connection to the database has been established successfully.")
	})
	.catch((error) => {
		console.error("Unable to connect to the database: %o", { errorMessage: error })
	})

export const syncDatabase = async () => await sequelizeDB.sync({ force: true })

export default sequelizeDB
