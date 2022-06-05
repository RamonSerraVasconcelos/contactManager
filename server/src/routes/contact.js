import express from 'express'
const contactRouter = express.Router()
import ContactController from '../controllers/ContactController.js'

contactRouter.get('/:userId', ContactController.list)

export default contactRouter
