'use strict';
const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Transaction = sequelize.define(
  'transaction',
  {
    date: {
      type: DataTypes.DATEONLY,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
  },
});

Transaction.belongsTo(Category);
Category.hasMany(Transaction);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
})();

module.exports = { Transaction, Category };
