import express, { Request, Response } from 'express'
import { logger } from './utils/log';

const app = express();
const hostname = '0.0.0.0'
const port = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('HelloWorld!')
})

app.listen(port, hostname, () => {
    logger.info(`Express app listening on http://${hostname}:${port}`)
})