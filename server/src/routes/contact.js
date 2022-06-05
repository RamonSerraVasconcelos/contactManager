import express from 'express'
const contactRouter = express.Router()
import ContactController from '../controllers/ContactController.js'

contactRouter.get('/', ContactController.list)
contactRouter.get('/:id', ContactController.get)
contactRouter.post('/create', ContactController.create)
contactRouter.put('/update/:id', ContactController.update)

export default contactRouter
