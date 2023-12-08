import express, { Request, Response } from 'express'
import cors from 'cors'

import { logger } from './utils/log';
import verifyToken from './middleware/verifyToken';
import albumRouter from './router/albumRouter'
import photoRouter from './router/photoRouter'
import authRouter from './router/authRouter'

const app = express();
const hostname = '0.0.0.0'
const port = 3000

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('upload'))

app.use('/auth', authRouter)
app.use('*',verifyToken)
app.use('/album', albumRouter)
app.use('/photo', photoRouter)

app.get('/', (req, res: Response) => { res.send('HelloWorld!') })

app.listen(port, hostname, () => {
    logger.info(`Express app listening on http://${hostname}:${port}`)
})