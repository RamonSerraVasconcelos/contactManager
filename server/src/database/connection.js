import mysql2 from 'mysql2'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('src', '../../.env') })

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
