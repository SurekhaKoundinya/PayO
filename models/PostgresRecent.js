const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const PostgresRecent = sequelize.define("PostgresRecent", {

  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },

  receiverName: {
    type: DataTypes.STRING
  },

  walletAddress: {
    type: DataTypes.STRING
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }

});

module.exports = PostgresRecent;