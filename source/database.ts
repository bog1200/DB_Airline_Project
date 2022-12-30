import mysql, {OkPacket, RowDataPacket} from "mysql2";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT ?? '3306')
});

pool.on('connection', (connection) => {
    console.log('MySQL connected');
});



function query(query: string, values?: any) {
    const queryId = uuidv4();
    console.log(`[SQL] (${queryId}): ${query} => ${values}`);
    return new Promise <OkPacket|RowDataPacket[]> ((resolve, reject) => {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                if (connection) connection.release();
                reject(err);
            } else {
                connection.execute(query, values, (err: any, results: any) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`[SQL] (${queryId}): ` + JSON.stringify(results));
                        resolve(results);
                    }
                });
            }
        });
    });
}








export { query, OkPacket, RowDataPacket };

