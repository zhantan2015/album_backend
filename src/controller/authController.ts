import { NextFunction, Request, Response } from "express";
import { stdout, logger } from "../utils/log";
import createDB from "../utils/db";
import Result from "../utils/result";

export default class {
    static async post(req: Request, res: Response, next: NextFunction) {
        const R = new Result(res)
        const { username, password } = req.body
        stdout.debug({ username, password })
        const db = createDB()
        const sql = `SELECT * FROM user WHERE username=? AND password=?`
        try {
            const result: any = await db.execute(sql, [username, password])
            stdout.debug(result)
            if (result.length > 0) next()
            else
                R.failed('用户名或密码错误').send()
        } catch (err) {
            logger.error(err)
            R.error('服务器错误!').send()
        }
    }
}