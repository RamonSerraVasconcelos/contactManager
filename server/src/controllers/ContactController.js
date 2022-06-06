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

            const phones = await Contact.listPhonesByContactId(req.params.id, req.user.id)
            contact.phones = phones

            const adresses = await Contact.listAdressesByContactId(req.params.id, req.user.id)
            contact.addresses = adresses

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

            const contactId = await Contact.create(req.body)

            if (!contactId) return res.status(500).send({
                message: "An unexpected error occured"
            })

            for (const phone of req.body.phones) {
                await Contact.createPhone(contactId, phone.number.replace(/\D/g, ""), phone.type)
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

            for (const id of req.body.phonesToBeDeleted) {
                await Contact.deletePhone(id, req.user.id)
            }

            for (const phone of req.body.phones) {
                if (phone.id == -1) {
                    await Contact.createPhone(req.body.id, phone.number.replace(/\D/g, ""), phone.type)
                } else {
                    await Contact.updatePhone(phone.id, req.user.id, phone)
                }
            }

            for (const id of req.body.addressesToBeDeleted) {
                await Contact.deleteAddress(id, req.user.id)
            }

            for (const address of req.body.addresses) {
                address.cep = address.cep.replace(/\D/g, "")

                if (address.id == -1) {
                    await Contact.createAddress(req.body.id, address)
                } else {
                    await Contact.updateAddress(req.user.id, address)
                }
            }

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
