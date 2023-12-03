import express from "express"
import cors from "cors"
import { cleanEnv, str, num } from "envalid"
import appRouter from "./routes/app.routes"
import swaggerUi from "swagger-ui-express"
import errorHandler from "./middlewares/errorHandler"
import swaggerFile from "./swagger_output.json"

import "dotenv/config"

export const environment = cleanEnv(process.env, {
	NODE_ENV: str({
		default: "development",
		choices: ["development", "test", "production", "staging"]
	}),
	PORT: num({ devDefault: 3000 })
})

const app = express()
const port = process.env.PORT

// logger?
app.use(express.json())
app.use(cors())
// helmet
// apiCache

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(appRouter)

appRouter.use((_req, res) => res.sendStatus(404))
app.use((error, _request, response) => {
	errorHandler(error, response)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})