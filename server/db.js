require("dotenv").config();

const { Pool } = require("pg");

/*
 * DO NOT NEED TO CONFIGURE POOL SINCE pg
 * AUTOMATICALLY TAKES THESE FROM THE
 * ENVIRONMENT VARIABLES
 */

const db = new Pool();

module.exports = { query: (text, params) => db.query(text, params) };


/*
{
user: "ubuntu",
host: "localhost",
database: "cmwa_db",
password: "cwma@DM21",
port: 5432
}
*/



/* FOR PRODUCTION PURPOSES */

// const Pool = require("pg").Pool;
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
// });


