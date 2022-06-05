import User from '../models/User.js'

const UserController = {
    async create(req, res) {
        try {
            const body = req.body

            if (!body.name || !body.password || !body.confirm_password || !req.body.email || !req.body.phone) {
                return res.status(422).send({
                    message: "All fields are required"
                })
            }

            if (body.name == "" || body.password == "" || body.confirm_password == "" || req.body.email == "" || req.body.phone == "") {
                return res.status(422).send({
                    message: "All fields are required"
                })
            }

            if (body.password != body.confirm_password) {
                return res.status(400).send({
                    message: "Passwords dont match"
                })
            }

            const isEmailDuplicated = await User.findOne({ where: { email: req.body.email } })
            if (isEmailDuplicated) {
                return res.status(400).send({
                    message: "Email already exists"
                })
            }

            const user = {
                name: body.name,
                password: body.password,
                email: body.email,
                phone: body.phone
            }

            if (!await User.create(user)) {
                return res.status(500).send({
                    message: "An unexpected error occured"
                })
            }

            res.status(201).send({
                success: true
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "An unexpected error occurred"
            })
        }

    }
}

export default UserController