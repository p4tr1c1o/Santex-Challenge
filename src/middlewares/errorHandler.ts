import { Response } from "express"


export function errorHandler(error, request, response?: Response) {
	console.error("Error encountered:", error.message || error)

	// TODO: check isOperational

	if (response) {
		return response.sendStatus(500)
	}
	process.exit(1)
}

export default errorHandler


