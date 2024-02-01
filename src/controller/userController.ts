import { Request, Response } from "express";
import { stdout } from "../utils/log";

export default class {
    static get(req: Request, res: Response) {
        res.send('hello user get')
    }
    static post(req: Request, res: Response) {
        stdout.debug(req.body)
        res.send('hello user post')
    }
}