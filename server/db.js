require("dotenv").config({path: "../.env"});


/*
 * DO NOT NEED TO CONFIGURE POOL SINCE pg
 * AUTOMATICALLY TAKES THESE FROM THE
 * ENVIRONMENT VARIABLES
 */
const { Pool } = require("pg");
const db = new Pool({user: "ubuntu", password: "CMWA@dm2021"});

db.on('connect', () => {
  console.log('connected to the db');
});

module.exports = { query: (text, params) => db.query(text, params) };


// const { Pool } = require("pg");
// const db = new Pool({
//   user: "ubuntu",
//   host: "localhost",
//   database: "cmwa_db",
//   password: "CMWA@dm2021",
//   port: 5432
//   });
// module.exports = { query: (text, params) => db.query(text, params) };


/* FOR PRODUCTION PURPOSES */

// const Pool = require("pg").Pool;
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// const db = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
// });
// module.exports = { query: (text, params) => db.query(text, params) };

