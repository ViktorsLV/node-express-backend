const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const BookRouter = require('./src/routes/bookRouter')

const errorHandler = require('./src/middlewares/errorHandler')
const notFound = require('./src/middlewares/notFound')

require('dotenv').config();

const app = express(); // initialize app 
const db = require('./src/db/connect')// connect to DB


// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))


// app.use(errorHandler)
// app.use(notFound)
// app.use(bodyParser.json());

// Book routes
app.use('/api/books', BookRouter)
app.get('/', (req, res) => {
  res.send('Hello')
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});