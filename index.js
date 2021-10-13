require('dotenv').config(); // to use .env variables
const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./src/routes/bookRouter')

const errorHandler = require('./src/middlewares/errorHandler')
const notFound = require('./src/middlewares/notFound')


const app = express(); // initialize app 
const connect = require('./src/db/connect') // connect to DB

app.use(express.json()); // for parsing application/json !!!

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// Middlewares
app.use(errorHandler)
app.use(notFound)

// Book routes 
app.use('/api/books', bookRouter)
app.get('/', (req, res) => {
  res.send('Hello')
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});