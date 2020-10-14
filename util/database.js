const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: "localhost",
  database: process.env.PGDATABASE,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
