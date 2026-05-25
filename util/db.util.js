import mysql from "mysql2/promise";

let db;

const connectDB = async function () {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  console.log(":db connected");
  // const [data, fields] = await db.execute(`select * from products`);
  // console.log(data);
  // console.log("fields", fields);
};

export { connectDB, db };
