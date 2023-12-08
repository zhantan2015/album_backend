import { Request, Response } from "express";
import { logger, stdout } from "../utils/log";
import Result from "../utils/result";
import createDB from "../utils/db";

export default class {
    static get(req: Request, res: Response) {
        res.send('hello photo get')
    }
    static async post(req: any, res: Response) {
        const R = new Result(res)
        const description = req.body['description']
        let sql = `INSERT INTO photo(uri,url,albumname,username\
${description ? ",description" : ""}\
) VALUES(?,?,?,?${description ? ",?" : ""})`;
        stdout.debug({ ...req.body })
        try {
            const db = createDB()
            await db.execute(
                sql,
                [
                    req.body['uri'],
                    req.body['url'],
                    req.body['albumname'],
                    req.body['username'],
                    description
                ])
            R.success('照片添加成功!')
        } catch (err: any) {
            logger.error(err)
            stdout.debug(err.code)
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                R.failed('该相册不存在!')
            } else {
                R.error()
            }
        }
    }
}