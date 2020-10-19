const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Mike:4kUee3nB7sgMldQ4@cluster0.fkbbv.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
//postgres connection:

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   "basic_node",
//   process.env.PGUSER,
//   process.env.PGPASSWORD,
//   { host: "localhost", dialect: "postgres", port: 5433 }
// );

// module.exports = sequelize;
