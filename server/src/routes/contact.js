import express from 'express'
const contactRouter = express.Router()
import ContactController from '../controllers/ContactController.js'

contactRouter.get('/', ContactController.list)
contactRouter.post('/create', ContactController.create)

export default contactRouter
