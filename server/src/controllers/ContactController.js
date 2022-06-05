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
    },
    async create(req, res) {
        if (!req.body.name || !req.body.lastName || !req.body.email || !req.body.phone) {
            return res.status(422).send({
                message: "All fields are required"
            })
        }

        if (req.body.name == "" || req.body.lastName == "" || req.body.email == "" || req.body.phone == "") {
            return res.status(422).send({
                message: "All fields are required"
            })
        }

        req.body.userId = req.user.id

        if (!await Contact.create(req.body)) {
            return res.status(500).send({
                message: "An unexpected error occured"
            })
        }

        return res.status(201).send({
            message: "Contact created"
        })
    }
}

export default ContactController
