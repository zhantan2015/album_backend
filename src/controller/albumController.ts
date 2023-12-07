import { Request, Response } from "express";

export default class {
    static get(req: Request, res: Response) {
        res.send('hello album get')
    }
    static post(req: Request, res: Response) {
        res.send('hello album post')
    }
}