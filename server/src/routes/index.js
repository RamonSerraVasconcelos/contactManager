import express from 'express'
const router = express.Router()
import userRouter from './user.js';
import contactRouter from './contact.js';
import { userAuth } from '../middlewares/userAuth.js'

router.use('/users', userRouter)
router.use('/contacts', userAuth, contactRouter)

export default router

