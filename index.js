require('dotenv').config(); // to use .env variables
const express = require('express');
const morgan = require('morgan');
const colors = require('colors'); 
const authRouter = require('./src/routes/authRouter') 
const bookRouter = require('./src/routes/bookRouter')
const userRouter = require('./src/routes/userRouter')

const errorHandler = require('./src/middlewares/errorHandler')
const notFound = require('./src/middlewares/notFound')


const app = express(); // initialize app 
const connect = require('./src/db/connect') // connect to DB

app.use(express.json()); // for parsing application/json !!!

// log only 2xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 200 }
}))

// Middlewares
app.use(errorHandler)
// app.use(notFound)

// Book routes 
app.use('/api/books', bookRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello, this is my API')
})

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Listening on port ${port}`.yellow.bold);
})