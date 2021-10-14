const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config();

// Connect to DB
const connect = mongoose.connect(process.env.DB_CONNECT, () => console.log(`connected to DB`.yellow.bold))


module.exports = connect
