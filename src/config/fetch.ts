import "dotenv/config"
import { cleanEnv, str } from "envalid"

const { API_KEY } = cleanEnv(process.env, {
	API_KEY: str({ example: "17ab6fce52f04846935b984bd7171141" })
})

export const requestOptions: RequestInit = {
	headers: {
		"X-Auth-Token": API_KEY
	}
}
