import express from "express"
import logger from "morgan"
import cors from "cors"
import { cleanEnv, str, num } from "envalid"
import appRouter from "./routes/app.routes"
import swaggerUi from "swagger-ui-express"
import errorHandler from "./middlewares/errorHandler"
import swaggerFile from "./swagger_output.json"
import debug from "debug"
import server from "./server"
import "dotenv/config"
import "./config/fetch"

export const environment = cleanEnv(process.env, {
	NODE_ENV: str({
		default: "development",
		choices: ["development", "test", "production", "staging"]
	}),
	PORT: num({ devDefault: 3000 }),
})

function initializeApp() {

	const app = express()
	const port = process.env.PORT

	app.use(logger("dev"))
	app.use(express.json())
	app.use(cors())
	// helmet
	// apiCache

	// Application Endpoints
	app.use(appRouter)

	// Swagger
	app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))
	app.use((req, res) => res.redirect("/doc"))

	// Route Not Found
	app.use((_req, res) => res.sendStatus(404))

	// Error Handlers
	app.use((error, _request, response) => {
		errorHandler(error, response)
	})
	return {
		server: app
			.listen(port)
			.on("listening", () => console.log(`[server]: Server is running at http://localhost:${port}`))
			.on("SIGTERM", () => {
				debug("SIGTERM signal received: closing HTTP server")
				server.close(() => {
					debug("HTTP server closed")
				})
			}),
		app
	}
}

export default initializeApp
