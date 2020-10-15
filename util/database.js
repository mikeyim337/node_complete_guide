const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "basic_node",
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { host: "localhost", dialect: "postgres", port: 5433 }
);

module.exports = sequelize;
