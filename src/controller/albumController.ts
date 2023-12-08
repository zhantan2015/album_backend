import { Request, Response } from "express";
import { logger, stdout } from "../utils/log";
import Result from "../utils/result";
import createDB from "../utils/db";

export default class {
    static async get(req: Request, res: Response) {
        const R = new Result(res)
        const albumname = req.query['albumname']
        let sql = `SELECT album_id,
        albumname,
        description,
        username,
        DATE_FORMAT(createtime,'%Y-%m-%d %H:%i:%s') createtime,
        DATE_FORMAT(updatetime,'%Y-%m-%d %H:%i:%s') updatetime FROM album ${albumname ? "WHERE albumname = ?" : ""}`
        try {
            const db = createDB()
            const result: any = await db.execute(sql, [albumname])
            R.setData(result).success('获取相册成功!')
        } catch (err) {
            logger.error(err)
            R.error()
        }
    }
    static async post(req: Request, res: Response) {
        const R = new Result(res)
        const { albumname, description, username } = req.body
        if (!albumname) {
            R.failed('albumname字段不能为空!')
        } else {
            const sql = `INSERT INTO album(\
                albumname${description ? ',\
                description': ''}${username ? ',\
                username': ''}) VALUES(?${description ? ',\
                ?': ''}${username ? ',\
                ?': ''})`;
            try {
                const db = createDB()
                await db.execute(sql, [albumname, description, username])
                R.success("添加相册成功!")
            } catch (err: any) {
                logger.error(err)
                stdout.debug(err.code)
                if (err['code'] == 'ER_DUP_ENTRY') {
                    R.failed('该相册已存在!')
                } else {
                    R.error("服务器出错!")
                }
            }
        }
    }
}

