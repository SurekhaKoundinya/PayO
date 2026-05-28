const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "payo_db",
  "postgres",
  "123456",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;