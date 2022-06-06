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
    listPhonesByContactId(contactId, userId) {
        const query = `SELECT 
                            p.* 
                        FROM 
                            tb_phone p
                        JOIN
                            tb_contact c
                        ON
                            p.contactId = c.id
                        WHERE 
                            c.id = ? 
                        AND 
                            c.userId = ?`

        const values = [
            contactId,
            userId
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                resolve(rows)
            })
        })
    },
    listAdressesByContactId(contactId, userId) {
        const query = `SELECT 
                            a.* 
                        FROM 
                            tb_address a
                        JOIN
                            tb_contact c
                        ON
                            a.contactId = c.id
                        WHERE 
                            c.id = ? 
                        AND 
                            c.userId = ?`

        const values = [
            contactId,
            userId
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                resolve(rows)
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
    },
    saveContactPic(thumb, contactId, userId) {
        const query = `UPDATE
                            tb_contact
                        SET
                            profilePic = ?
                        WHERE 
                            id = ?
                        AND 
                            userId = ?`

        const values = [
            thumb,
            contactId,
            userId
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.changedRows)
            })
        })
    },
    createPhone(contactId, number, type) {
        const query = `INSERT INTO
                        tb_phone
                        (contactId, 
                        number, 
                        type) 
                    VALUES 
                        (?,
                        ?, 
                        ?)`

        const values = [
            contactId,
            number,
            type
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.insertId)
            })
        })
    },
    updatePhone(id, userId, phone) {
        const query = `UPDATE
                            tb_phone p
                        JOIN
                            tb_contact c
                        ON
                            p.contactId = c.id
                        SET
                            p.number = ?, 
                            p.type = ?
                        WHERE 
                            p.id = ?
                        AND 
                            c.userId = ?`

        const values = [
            phone.number,
            phone.type,
            id,
            userId
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.changedRows)
            })
        })
    },
    deletePhone(id, userId) {
        const query = `DELETE p FROM 
                            tb_phone p  
                        INNER JOIN
                            tb_contact c
                        ON
                            p.contactId = c.id
                        WHERE
                            p.id = ?
                        AND
                            c.userId = ?`

        const values = [
            id,
            userId
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.changedRows)
            })
        })
    },
    createAddress(contactId, address) {
        const query = `INSERT INTO
                        tb_address
                        (contactId, 
                        cep, 
                        street,
                        state,
                        city) 
                    VALUES 
                        (?,
                        ?, 
                        ?,
                        ?,
                        ?)`

        const values = [
            contactId,
            address.cep,
            address.street,
            address.state,
            address.city
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.insertId)
            })
        })
    },
    updateAddress(userId, address) {
        const query = `UPDATE
                            tb_address a
                        JOIN
                            tb_contact c
                        ON
                            a.contactId = c.id
                        SET
                            a.cep = ?, 
                            a.street = ?,
                            a.state = ?,
                            a.city = ?
                        WHERE 
                            a.id = ?
                        AND 
                            c.userId = ?`

        const values = [
            address.cep,
            address.street,
            address.state,
            address.city,
            address.id,
            userId
        ]

        return new Promise(function (resolve, reject) {
            db.execute(query, values, function (err, rows) {
                if (err) return reject(err)

                resolve(rows.changedRows)
            })
        })
    },
    deleteAddress(id, userId) {
        const query = `DELETE a FROM 
                            tb_address a  
                        INNER JOIN
                            tb_contact c
                        ON
                            a.contactId = c.id
                        WHERE
                            a.id = ?
                        AND
                            c.userId = ?`

        const values = [
            id,
            userId
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