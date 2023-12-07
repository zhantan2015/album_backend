import { Request, Response } from "express";
import { stdout } from "../log";

export default class {
    static get(req: Request, res: Response) {
        res.send('hello album get')
    }
    static post(req: Request, res: Response) {
        stdout.debug(req.body)
        res.send('hello album post')
    }
}