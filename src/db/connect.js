const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

// Connect to DB
const connect = mongoose.connect(process.env.DB_CONNECT, () => console.log(`connected to DB`))


module.exports = connect
