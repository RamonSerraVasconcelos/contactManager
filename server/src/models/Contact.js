import db from '../database/connection.js'

const Contact = {
    findByUserId(userId) {
        const query = "SELECT * FROM tb_contact WHERE userId = ?"

        return new Promise(function (resolve, reject) {
            db.execute(query, [userId], (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                resolve(rows)
            })
        })
    },
    findOne(id, userId) {
        const query = "SELECT * FROM tb_contact WHERE id = ? AND userId = ?"

        return new Promise(function (resolve, reject) {
            db.execute(query, [id, userId], (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                resolve(rows[0])
            })
        })
    },
    create(contact) {

        const query = `INSERT INTO
                            tb_contact
                            (userId, 
                            name, 
                            lastName, 
                            email, 
                            phone) 
                        VALUES 
                            (?,
                            ?, 
                            ?, 
                            ?, 
                            ?)`

        const values = [
            contact.userId,
            contact.name,
            contact.lastName,
            contact.email,
            contact.phone
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.insertId)
            })
        })
    },
    update(contact) {
        const query = `UPDATE
                            tb_contact
                        SET
                            name = ?, 
                            lastName = ?, 
                            email = ?, 
                            phone = ?
                        WHERE 
                            id = ?
                        AND 
                            userId = ?`

        const values = [
            contact.name,
            contact.lastName,
            contact.email,
            contact.phone,
            contact.id,
            contact.userId
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.changedRows)
            })
        })
    }
}

export default Contact