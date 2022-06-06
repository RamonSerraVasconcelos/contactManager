import express from 'express'
const contactRouter = express.Router()
import ContactController from '../controllers/ContactController.js'
import multer from '../middlewares/multer.js'

contactRouter.get('/', ContactController.list)
contactRouter.get('/:id', ContactController.get)
contactRouter.post('/create', ContactController.create)
contactRouter.put('/update/:id', ContactController.update)
contactRouter.post('/saveContactPic', multer.single('fileToUploadContactPic'), ContactController.saveContactPic)

export default contactRouter
