import "reflect-metadata"
import { DataSource } from "typeorm"
import Competition from "../entity/Competition"
import Team from "../entity/Team"
import Coach from "../entity/Coach"
import Player from "../entity/Player"

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "database.sqlite",
	synchronize: true,
	logging: true,
	entities: [
		Competition,
		Team,
		Coach,
		Player
	],
	migrations: [],
	subscribers: [],
})

export const syncDatabase = async () => AppDataSource.initialize()
	.then(() => {
		console.info("The connection to the database has been established successfully.")
	})
	.catch((error) => {
		console.error("Unable to connect to the database: %o", { errorMessage: error })
	})