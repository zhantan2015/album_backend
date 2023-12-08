import config from '../config.json'
import jwt from 'jsonwebtoken';
import Reslut from '../utils/result';
import { logger, stdout } from '../utils/log';
import { Response, NextFunction } from 'express';

export default (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;
    const secretKey = config['secret_key']
    const R = new Reslut(res)
    stdout.debug(req.headers.authorization)
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            logger.info("verify error");
            R.failed('会话超时!').send()
        } else {
            logger.info("verify decoded", decoded);
            req['token_decoded'] = decoded;
            next();
        }
    })
}