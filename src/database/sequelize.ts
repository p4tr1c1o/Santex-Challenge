import { Sequelize } from "sequelize"

const sequelize = new Sequelize("sqlite::memory:", {
	logging: false
})


sequelize
	.authenticate()
	.then(() => {
		console.info("The connection to the database has been established successfully.")
	})
	.catch((error) => {
		console.error("Unable to connect to the database: %o", { errorMessage: error })
	})

export default sequelize
