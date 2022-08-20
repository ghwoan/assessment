import mysql from 'mysql2';
import dbConfig from "../config/db.config.js";

const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.USER,
    database: dbConfig.DB,
   password: dbConfig.PASSWORD,
   waitForConnections: true,
   connectionLimit: 20,
});

const db = pool.promise();

export default db;