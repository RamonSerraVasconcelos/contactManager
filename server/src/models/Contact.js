import db from '../database/connection.js'

const Contact = {
    findByUserId(userId) {
        let query = "SELECT * FROM tb_contact WHERE userId = ?"

        return new Promise(function (resolve, reject) {
            db.execute(query, [userId], (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                resolve(rows)
            })
        })
    }
}

export default Contact