
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
        this.send()
    }

    failed(msg: string) {
        this.body.code = 400
        this.body.msg = msg
        this.send()
    }

    error(msg?: string) {
        this.body.code = 500
        this.body.msg = msg || "服务器出错!"
        this.send()
    }

    setData(data: result_data) {
        this.body.data = data
        return this
    }

    send() {
        this.res.send(this.body)
    }
}