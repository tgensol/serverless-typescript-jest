import { APIGatewayEvent, Context } from "aws-lambda"

export const hello = async (event: APIGatewayEvent, context: Context) => {
    return {
        body: JSON.stringify({
            input: event,
            message: "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
        }),
        statusCode: 200,
    }
}
