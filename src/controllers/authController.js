const {generateToken} = require('../utils/generateToken.js')
const {User, validate} = require('../models/userModel')
const bcrypt = require('bcrypt')


// @route   POST /api/users/login
// @access  Public
loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send('Email and/or password is wrong')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send('Email and/or password is wrong')
    if (user && validPassword)
      return res.status(200).json({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)
        });

  } catch (error) {
    res.status(400).json('error: Invalid user data')
  }
}

// @route   POST /api/users/register
// @access  Public
registerUser = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { firstName, lastName, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).send('User already exists')
    throw new Error('User already exists')
  }

  const newUser = new User({firstName, lastName, email, password})

  try {
    const user = await newUser.save()
    if (!user) throw new Error("Something went wrong, please, try again");
      
    if (user) {
      // 201 - successful creation which led to creation of a resource
      res.status(201).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    }
  } catch (error) {
    res.status(400).json(error)
    throw new Error('Invalid user data')   
  }
}

module.exports = {
  loginUser,
  registerUser,
}