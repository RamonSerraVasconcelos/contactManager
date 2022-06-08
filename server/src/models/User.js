import db from '../database/connection.js'
import bcrypt from 'bcryptjs'

const User = {
    findOne(filters) {
        let query = "SELECT * FROM tb_user"

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}`

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        return new Promise(function (resolve, reject) {
            db.query(query, function (err, rows, fields) {
                if (err) {
                    return reject(err)
                }
                resolve(rows[0])
            })
        })
    },
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
    },
    update(id, user) {
        const query = `UPDATE
                            tb_user
                        SET
                            name = ?,
                            email = ?,
                            phone = ?
                        WHERE 
                            id = ?`

        const values = [
            user.name,
            user.email,
            user.ephone,
            id
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.changedRows)
            })
        })
    }
}

export default User