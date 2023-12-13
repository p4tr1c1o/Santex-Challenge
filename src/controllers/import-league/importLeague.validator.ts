import { Response } from "express"
import * as Yup from "yup"


async function importLeagueValidator(request, response: Response, next) {

	const permitedLegueCodes = [
		"WC",
		"CL",
		"BL1",
		"DED",
		"BSA",
		"PD",
		"FL1",
		"ELC",
		"PPL",
		"EC",
		"SA",
		"PL",
		"CLI"
	]

	const schema = Yup.object({
		leagueCode: Yup.string().required().oneOf(permitedLegueCodes),
	})

	try {
		await schema.validate(request.body)

	} catch (error) {
		response.status(422).json(error)
	}

	next()
}

export default importLeagueValidator