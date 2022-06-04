import User from '../models/User.js'

const UserController = {
    async create(req, res) {
        const body = req.body

        if (!body.name || !body.password || !req.body.email || !req.body.phone) {
            return res.status(422).send({
                success: false,
                message: "All fields are required"
            })
        }

        if (body.name == "" || body.password == "" || req.body.email == "" || req.body.phone == "") {
            return res.status(422).send({
                success: false,
                message: "All fields are required"
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
                success: false,
                message: "An unexpected error occured"
            })
        }

        res.status(201).send({
            success: true
        })
    }
}

export default UserController