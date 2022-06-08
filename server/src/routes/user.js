import express from 'express'
const userRouter = express.Router()
import UserController from '../controllers/UserController.js'
import SessionController from '../controllers/SessionController.js'
import { userAuthRefresh } from '../middlewares/userAuth.js'
import { userAuth } from '../middlewares/userAuth.js'

userRouter.post('/register', UserController.create)
userRouter.post('/login', SessionController.login)
userRouter.post('/refresh', userAuthRefresh, SessionController.refresh)
userRouter.get('/:id', userAuth, UserController.get)
userRouter.put('/:id', userAuth, UserController.update)

export default userRouter
