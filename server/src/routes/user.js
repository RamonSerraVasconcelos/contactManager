import express from 'express'
const userRouter = express.Router()
import UserController from '../controllers/UserController.js'
import SessionController from '../controllers/SessionController.js'

userRouter.post('/register', UserController.create)
userRouter.post('/login', SessionController.login)

export default userRouter
