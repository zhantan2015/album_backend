import config from '../config.json'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Result from "../utils/result";

export default (req: Request, res: Response) => {
    const R = new Result(res)
    const payload = { username: req.body.username }
    const secretKey = config['secret_key']
    R.setData({
            token: 'Bearer ' + jwt.sign(payload, secretKey, {
                expiresIn: 60 * 60 * 24 * 7,
            })
        }).success('登录成功!')
}