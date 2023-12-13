
import dotenv from "dotenv"
import app from "./app"
import { syncDatabase } from "./database/sequelize"


dotenv.config()

syncDatabase()

const server = app().server

export default server
