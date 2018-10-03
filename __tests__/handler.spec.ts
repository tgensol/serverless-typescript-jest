import { hello } from "../handler"
import * as context from 'aws-lambda-mock-context'

describe("This is a simple test", () => {
    test("Check the hello function", () => {
        const ctx = context();
        let evt = {}
        hello(evt, ctx)
        ctx.Promise
            .then((res: any) => {
                expect(res.statusCode).toBe(200)
            })
            .catch((err: any) => {
                console.log('ERRR', err)
            });
    });
});
