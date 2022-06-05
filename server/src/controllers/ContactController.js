import Contact from '../models/Contact.js'

const ContactController = {
    async list(req, res) {
        try {
            const contacts = await Contact.findByUserId(req.user.id)
            if (!contacts) return res.status(404).send({
                message: "No contacts found"
            })

            return res.status(200).send({
                contacts
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "An unexpected error occurred"
            })
        }

    },
    async get(req, res) {
        try {
            if (!req.params.id) return res.status(400).send({
                message: "Parameters missing"
            })

            const contact = await Contact.findOne(req.params.id, req.user.id)

            if (!contact) return res.status(400).send({
                message: "Contact not found"
            })

            return res.status(200).send({
                contact
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "An unexpected error occurred"
            })
        }
    },
    async create(req, res) {
        try {
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
            req.body.phone = req.body.phone.replace(/\D/g, "")

            if (!await Contact.create(req.body)) {
                return res.status(500).send({
                    message: "An unexpected error occured"
                })
            }

            return res.status(201).send({
                message: "Contact created"
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "An unexpected error occurred"
            })
        }
    },
    async update(req, res) {
        try {
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

            req.body.id = req.params.id
            req.body.userId = req.user.id
            req.body.phone = req.body.phone.replace(/\D/g, "")

            if (!await Contact.update(req.body)) {
                return res.status(200).send({
                    message: "No fields were updated"
                })
            }

            return res.status(200).send({
                message: "Contact updated"
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "An unexpected error occurred"
            })
        }
    }
}

export default ContactController
