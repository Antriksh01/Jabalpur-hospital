const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const client_db = mysql.createConnection({
  host: process.env.SERVERHOST,
  user: process.env.SERVERUSER,
  password: process.env.SERVERPASSWORD,
  database: process.env.SERVERDATABASE,
});

// Connect to the databases
db.connect((err) => {
  if (err) {
    console.error("Error connecting to db1:", err);
  } else {
    console.log("Connected to db1!");
  }
});

client_db.connect((err) => {
  if (err) {
    console.error("Error connecting to db2:", err);
  } else {
    console.log("Connected to db2!");
  }
});

module.exports = { db, client_db };
