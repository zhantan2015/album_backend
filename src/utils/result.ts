
import { Response } from 'express'

type result_code = 200 | 400 | 500
type result_data = {} | [] | undefined

export default class {
    res: Response
    body: {
        code: result_code
        msg: string
        data?: {} | []
    }

    constructor(res: Response) {
        this.res = res
        this.body = {
            code: 200,
            msg: "",
        }
    }

    success(msg: string) {
        this.body.code = 200
        this.body.msg = msg
        return this
    }

    failed(msg: string) {
        this.body.code = 400
        this.body.msg = msg
        return this
    }

    error(msg: string) {
        this.body.code = 500
        this.body.msg = msg
        return this
    }

    setData(data: result_data) {
        this.body.data = data
        return this
    }

    send() {
        this.res.send(this.body)
    }
}