import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('src', '../../.env') })

const userAuth = (req, res, next) => {
    if (!req.headers["authorization"]) return res.status(401).send({
        success: false,
        message: "User not authorized"
    })

    let token = req.headers["authorization"]
    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
        if (err) {
            return res.status(401).send({
                success: false,
                message: "User not authorized"
            })
        }

        req.user = user
        next()
    })
}

const userAuthRefresh = (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).send({
        success: false,
        message: "User not authorized"
    })

    jwt.verify(refreshToken, process.env.SECRET_JWT_KEY_REFRESH, (err, token) => {
        if (err) {
            return res.status(401).send({
                success: false,
                message: "User not authorized"
            })
        }

        req.user = token.user
        next()
    })
}

export { userAuth, userAuthRefresh }