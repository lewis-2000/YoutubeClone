const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // change to your MySQL user after cloning after cloning the repo
  password: "password", // change to your MySQL password after cloning the repo
  database: "youtube_clone",
});

module.exports = pool.promise();
