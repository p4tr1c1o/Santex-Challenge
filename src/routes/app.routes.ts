import { Router } from "express"

const appRouter = Router()

appRouter.get("/health", (_, res) => res.sendStatus(200))

appRouter.post("/importLeague/:leagueCode")
appRouter.get("/team/:name")
appRouter.get("/players/:leagueCode")

export default appRouter
