import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('src', './public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, `thumb_${Date.now().toString()}${path.extname(file.originalname)}`)
    }
})


export default multer({
    storage
})
