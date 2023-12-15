import { Response } from "express"
import { requestOptions } from "../../config/fetch"
import { AppDataSource } from "../../database/data-source"
import Competition from "../../entity/Competition"
import Team from "../../entity/Team"
import createError from "http-errors"
import { In } from "typeorm"
import Coach from "../../entity/Coach"
import Player from "../../entity/Player"

async function importLeague(req, res: Response, next) {
	const { leagueCode } = req.body
	const queryRunner = AppDataSource.createQueryRunner()
	await queryRunner.connect()
	await queryRunner.startTransaction()

	try {
		const competitionsResult = await fetch(`${process.env.FOOTBALL_API_URL}/competitions/`, requestOptions)
		if (!competitionsResult.ok)
			throw createError(competitionsResult.status, competitionsResult.statusText)

		const { competitions: competitionsData } = await competitionsResult.json()
		const competitions: Array<Competition> = competitionsData?.map(data => ({
			name: data.name,
			code: data.code,
			areaName: data.area?.name
		}))

		await queryRunner.manager.upsert(Competition, competitions, ["name"])

		const teamsResponse = await fetch(`${process.env.FOOTBALL_API_URL}/competitions/${leagueCode}/teams`, requestOptions)
		if (!teamsResponse.ok)
			throw new Error(`${teamsResponse.status}: ${teamsResponse.statusText}`)

		const result = await teamsResponse.json()

		result.teams?.forEach(async data => {
			const teamResult = await queryRunner.manager.findOneBy(Team, { name: data.name })
			const team = new Team({
				id: teamResult?.id,
				name: data.name,
				shortName: data.shortName,
				tla: data.tla,
				areaName: data.area?.name,
				address: data.address,
			})

			const runningCompetitions = await queryRunner.manager.findBy(Competition, {
				name: In(data.runningCompetitions?.map(x => x.name))
			})
			team.competitions = runningCompetitions

			const coachResult = await queryRunner.manager.findOneBy(Coach, { name: data.coach?.name })
			const coach = new Coach({
				name: data.coach?.name,
				dateOfBirth: data.coach?.dateOfBirth,
				nationality: data.coach?.nationality,
			})
			if (coachResult?.id) coach.id == coachResult.id

			const savedTeam = await queryRunner.manager.save(team)
			const squad = data.squad?.map(player => new Player({
				name: player.name,
				dateOfBirth: player.dateOfBirth,
				nationality: player.nationality,
				position: player.position,
				team: savedTeam
			}))

			await queryRunner.manager.upsert(Player, squad, ["name"])
		})

		await queryRunner.commitTransaction()

		const results = await queryRunner.manager.find(Team, { relations: { squad: true } })

		return res.json(results)

	} catch (error) {
		return next(error)
	}
}

export default importLeague
