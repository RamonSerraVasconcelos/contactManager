import Contact from '../models/Contact.js'

const ContactController = {
    async list(req, res) {
        if (!req.params.userId) return res.status(400).send({
            message: "User Id missing"
        })

        const contacts = await Contact.findByUserId(req.params.userId)
        if (!contacts) return res.status(404).send({
            message: "No contacts found"
        })

        return res.status(200).send({
            contacts
        })
    }
}

export default ContactController
