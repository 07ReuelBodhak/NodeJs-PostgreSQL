const { Pool } = require("pg");

const pool = new Pool({
  host: "host_name",
  port: 5432,
  user: "user_name",
  password: "your_password",
  database: "database_name",
});

module.exports = pool;
