'use strict';
const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Transaction = sequelize.define('transaction', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Transaction.belongsTo(Category);
Category.hasMany(Transaction);

async function sync() {
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Transaction, Category, sync };
