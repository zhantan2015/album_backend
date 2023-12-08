import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { logger, stdout } from '../utils/log'
import randStr from '../utils/randStr'
import getExt from '../utils/getExt'


export default (filename: string, path?: string) => {
    const _path = path || 'upload/img/'
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, _path)
        },
        filename(req_, file, cb) {
            const extension = getExt(file.originalname)
            const filename = randStr(20) + extension
            cb(null, filename)
        }
    })

    return (req: Request, res: Response, next: NextFunction) => {
        const upload = multer({ storage }).single(filename)
        upload(req, res, err => {
            if (err) {
                logger.error(err)
                res.send('err')
            } else {
                stdout.debug(req.file)
                req.body.ori = req.file?.path
                next()
            }
        })
    }
}