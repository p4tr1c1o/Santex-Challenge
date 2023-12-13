import { Router } from "express"
import importLeague from "../controllers/import-league/importLeague"
import importLeagueValidator from "../controllers/import-league/importLeague.validator"

const appRouter = Router()

appRouter.post("/importLeague", importLeagueValidator, importLeague, (req, res) => {
	const { leagueCode } = req.body
	return res.sendStatus(200).json(leagueCode)
})

appRouter.get("/health", (_, res) => res.sendStatus(200))

// appRouter.get("/team/:name")
// appRouter.get("/players/:leagueCode")

export default appRouter
