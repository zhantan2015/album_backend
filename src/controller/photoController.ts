import { Request, Response } from "express";
import { logger, stdout } from "../utils/log";
import Result from "../utils/result";
import createDB from "../utils/db";

export default class {
    static async get(req: Request, res: Response) {
        const R = new Result(res)
        const albumname = req.query['albumname']
        let sql = `SELECT 
        photo_id,
        albumname,
        description,
        uri,
        url,
        username,
        DATE_FORMAT(createtime,'%Y-%m-%d %H:%i:%s') createtime,
        DATE_FORMAT(updatetime,'%Y-%m-%d %H:%i:%s') updatetime FROM photo
        ${albumname ? "WHERE albumname = ?" : ""}`
        try {
            const db = createDB()
            const result: any = await db.execute(sql, [albumname])
            R.setData(result).success('获取照片成功!')
        } catch (err) {
            logger.error(err)
            R.error()
        }
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