const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const sequelize = new Sequelize(
  process.env.SQL_DATABASE,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = { connectMongo, sequelize };
