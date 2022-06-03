import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes/index.js'

dotenv.config({ path: path.resolve('src', '../../.env') })

const server = express()
server.use(express.json())
server.use(cors())
server.use('/', routes)

server.use(
    (error, req, res, next) => {
        res.status(error.status || 500)
        res.send({
            error: {
                status: error.status || 500,
                message: error.message
            }
        })
        next()
    }
);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`)
});
