import { Request, Response } from "express";
import { logger, stdout } from "../utils/log";
import Result from "../utils/result";
import dbCreate from '../utils/db'

export default class {
    static get(req: Request, res: Response) {
        res.send('hello album get')
    }
    static async post(req: Request, res: Response) {
        const R = new Result(res)
        const { album_name, description, user_id } = req.body
        if (!album_name) {
            R.failed('album_name字段不能为空!').send()
        } else {
            const sql = `INSERT INTO album(\
                album_name${description ? ',\
                description': ''}${user_id ? ',\
                user_id': ''}) VALUES(?${description ? ',\
                ?': ''}${user_id ? ',\
                ?': ''})`;
            try {
                const db = await dbCreate()
                await db.execute(sql, [album_name, description, user_id].filter(i => i))
                R.success("添加相册成功!").send()
            } catch (err) {
                logger.error(err)
                R.error("服务器出错!").send()
            }
        }
    }
}

