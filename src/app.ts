import express, { Request, Response } from 'express'
import cors from 'cors'
import { logger } from './utils/log';
import albumRouter from './router/albumRouter'
import photoRouter from './router/photoRouter'
import userRouter from './router/userRouter'

const app = express();
const hostname = '0.0.0.0'
const port = 3000


app.use(cors())
app.get('/', (req: Request, res: Response) => {
    res.send('HelloWorld!')
})

app.use('/album', albumRouter)
app.use('/photo', photoRouter)
app.use('/user', userRouter)


app.listen(port, hostname, () => {
    logger.info(`Express app listening on http://${hostname}:${port}`)
})