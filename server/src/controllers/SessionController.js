import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('src', '../../.env') })

const SessionController = {
    async login(req, res) {
        try {
            if (!req.body.email || req.body.email == "" || !req.body.password || req.body.password == "") {
                return res.status(422).send({
                    success: false,
                    message: "All fields are required"
                })
            }

            const user = await User.findOne({ where: { email: req.body.email } })

            if (!user) return res.status(404).send({
                success: false,
                message: "User not found"
            })

            if (!await bcrypt.compare(req.body.password, user.password)) return res.status(404).send({
                success: false,
                message: "User not found"
            })

            const accessToken = jwt.sign(user, process.env.SECRET_JWT_KEY, { expiresIn: "15m" })
            const refreshToken = jwt.sign(user, process.env.SECRET_JWT_KEY_REFRESH, { expiresIn: "7d" })

            return res.status(200).send({
                success: true,
                accessToken,
                refreshToken
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                success: false,
                message: "An unexpected error occurred"
            })
        }

    }
}

export default SessionController