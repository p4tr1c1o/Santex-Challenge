import { Response } from "express"
import sequelizeDB from "../../database/sequelize"
import Competition from "../../models/Competition"
import Coach from "../../models/Coach"
import Player from "../../models/Player"
import Team from "../../models/Team"
import { requestOptions } from "../../config/fetch"

type TeamDTO = {
	name: string,
	tla: string,
	areaName: string,
	shortName: string,
	address: string,
}

type PlayerDTO = {
	name: string,
	position: string,
	dateOfBirth: string,
	nationality: string
}

type CoachDTO = {
	name: string,
	position: string,
	dateOfBirth: string,
	nationality: string
}

async function importLeague(req, res: Response, next) {
	try {
		const { leagueCode } = req.body
		const transaction = await sequelizeDB.transaction()
		const teams: Array<TeamDTO> = []
		const coaches: Array<CoachDTO> = []
		const players: Array<PlayerDTO> = []

		const competitionResult = await fetch(`${process.env.FOOTBALL_API_URL}/competitions/${leagueCode}`, requestOptions)

		if (!competitionResult.ok) {
			console.log(competitionResult, "competitionResult")
			throw new Error(`${competitionResult.status}: ${competitionResult.statusText}`)
		}

		const competitionData = await competitionResult.json()

		await Competition.create({
			name: competitionData.name,
			code: competitionData.code,
			areaCode: competitionData.area?.code,
		})


		const result = await fetch(`${process.env.FOOTBALL_API_URL}/competitions/${leagueCode}/teams`, requestOptions)

		if (!result.ok) {
			console.log("result", result)
			throw new Error(`${competitionResult.status}: ${competitionResult.statusText}`)
		}

		const data = await result.json()

		data.teams?.forEach(team => {
			teams.push({
				name: team.name,
				tla: team.tla,
				areaName: team.area?.name,
				shortName: team.shortName,
				address: team.address,
			})
			coaches.push({
				name: team.coach?.name,
				dateOfBirth: team.coach?.dateOfBirth,
				nationality: team.coach?.nationality,
				position: team.coach?.position
			})
			team.squad?.forEach(player => {
				players.push({
					name: player.name,
					dateOfBirth: player.dateOfBirth,
					nationality: player.nationality,
					position: player.position
				})
			})

			return
		})

		await Team.bulkCreate(teams, { transaction })
		await Coach.bulkCreate(coaches, { transaction })
		await Player.bulkCreate(players, { transaction })
		await transaction.commit()

		return res.json({ teams, coaches, players })

	} catch (error) {
		return next(error)
	}
}

export default importLeague
