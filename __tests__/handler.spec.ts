import { APIGatewayEvent } from "aws-lambda"
import * as context from "aws-lambda-mock-context"
import { hello } from "../handler"

describe("This is a simple test", () => {
    test("Check the hello function", () => {
        const ctx = context()
        const evt = {}
        hello(evt as APIGatewayEvent, ctx)
        ctx.Promise
            .then((res: any) => {
                expect(res.statusCode).toBe(200)
            })
            .catch((err: any) => {
                // tslint:disable-next-line:no-console
                console.log("ERRR", err)
            })
    })
})
