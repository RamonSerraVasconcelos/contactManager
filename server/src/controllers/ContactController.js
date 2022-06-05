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
    }
}

export default ContactController
