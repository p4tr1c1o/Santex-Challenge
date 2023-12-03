import swaggerAutogen from "swagger-autogen"

const outputFile = "./swagger_output.json"
const endpointsFiles = [
	// "./src/routes/router.ts",
	""
]

swaggerAutogen()(outputFile, endpointsFiles).then(async () => {
	await import("./app")
})