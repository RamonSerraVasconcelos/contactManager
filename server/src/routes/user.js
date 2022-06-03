import express from 'express'
const userRouter = express.Router()
import UserController from '../controllers/UserController.js'

userRouter.post('/register', UserController.create)

export default userRouter
