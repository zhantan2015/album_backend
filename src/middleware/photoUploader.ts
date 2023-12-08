import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { logger, stdout } from '../utils/log'
import randStr from '../utils/randStr'
import getExt from '../utils/getExt'
import Result from '../utils/result'


export default (filename: string, path?: string) => {
    const _path = path || 'upload/img/'
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, _path)
        },
        filename(req, file, cb) {
            const extension = getExt(file.originalname)
            const filename = randStr(20) + extension
            cb(null, filename)
        }
    })

    return (req: Request, res: Response, next: NextFunction) => {
        const R = new Result(res)
        stdout.debug({ ...req.body })
        const username = req.body.username

        const upload = multer({ storage }).single(filename)
        upload(req, res, (err) => {
            stdout.debug('====================')

            if (!req.file || !req.body.albumname) {
                R.failed("输入参数有误！")
                return next(1)
            }
            if (err) {
                logger.error(err)
                res.send('err')
            } else {
                req.body.uri = req.file?.path
                req.body.url = '/img/' + req.file?.filename
                req.body.username = username
                stdout.debug({ ...req.body })
                next()
            }
        })
    }
}