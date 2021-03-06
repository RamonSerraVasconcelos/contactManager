import User from '../models/User.js'
import Mailer from '../lib/mailer.js'

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
                phone: body.phone.replace(/\D/g, "")
            }

            if (!await User.create(user)) {
                return res.status(500).send({
                    message: "An unexpected error occured"
                })
            }

            Mailer.sendMail({
                to: body.email,
                from: 'ramonserrav@hotmail.com',
                subject: `Confirmação de inscrição - Agenda de Contatos`,
                html: `
                    <h1 style="text-align:center">Agenda de Contatos</h1>
                    <br>
                    <p>Olá ${body.name}, o seu usuário no website Agenda de Contato foi criado com sucesso.</p>
                    <p style="text-align:center"><a href="http://127.0.0.1:5500/client/index.html" target="_blank" style="text-decoration:none;padding:5px;background:red;color:white;font-size:20px;font-weight:bold">LINK DE ACESSO</a></p>
                    <div style="margin-top:200px;text-align:justify">
                        <h2>Agenda de Contatos</h2>
                    </div>
                `
            })

            res.status(201).send({
                message: "User created"
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
            if (req.params.id != req.user.id) {
                return res.status(401).send({
                    message: "Not authorized"
                })
            }

            if (!req.body.name || !req.body.email || !req.body.phone) {
                return res.status(422).send({
                    message: "All fields are required"
                })
            }

            if (req.body.name == "" || req.body.email == "" || req.body.phone == "") {
                return res.status(422).send({
                    message: "All fields are required"
                })
            }

            if (!await User.update(req.params.id, req.body)) {
                return res.status(500).send({
                    message: "An unexpected error occurred"
                })
            }

            res.status(200).send({
                message: "User updated"
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "An unexpected error occurred"
            })
        }
    },
    async saveProfilePic(req, res) {
        try {
            await User.saveProfilePic(req.user.id, req.file.filename)

            return res.status(200).send({
                message: "Picture updated"
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
            if (req.params.id != req.user.id) {
                return res.status(401).send({
                    message: "Not authorized"
                })
            }

            const user = await User.findOne({ where: { id: req.params.id } })

            if (user.profilePic == "" || user.profilePic == null) {
                user.profilePic = "https://bootdey.com/img/Content/avatar/avatar1.png"
            } else {
                user.profilePic = "http://localhost:3000/images/" + user.profilePic
            }

            res.status(200).send({
                user
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