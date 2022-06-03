import db from '../database/connection.js'
import bcrypt from 'bcryptjs'

const User = {
    async create(user) {
        //Hash password and remove not letter c from cpf
        const passwordHash = await bcrypt.hash(user.password, 8)

        const query = `INSERT INTO
                            tb_user
                            (name,
                            password,
                            email, 
                            phone) 
                        VALUES 
                            (?,
                            ?,
                            ?,
                            ?)`
        const values = [
            user.name,
            passwordHash,
            user.email,
            user.phone
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.insertId)
            })
        })
    }
}

export default User