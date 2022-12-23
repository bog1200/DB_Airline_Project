import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT ?? '3306')
});

pool.on('error', (err: any) => {
    console.log(`[SQL] : ${err}`)
});



function query(query: string, values?: any) {
    console.log(`[SQL] : ${query}`);
    console.log(`[SQL] : ${values}`);
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                if (connection) connection.release();
                reject(err);
            } else {
                connection.query(query, values, (err: any, results: any) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                });
            }
        });
    });
}




function end() {
    pool.end();
}


export { query, end };

