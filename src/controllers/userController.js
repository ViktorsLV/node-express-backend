const { User, validate } = require("../models/userModel");

// @route   GET /api/users
// @access  Public 
getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(404).json(err)
  }
};

// @route   GET /api/users/count
// @access  Public 
getUsersCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    res.status(200).json({count: userCount});
  } catch (err) {
    res.status(404).send('No Users in DB')  
  }
};

// @route   GET /api/users/:id
// @access  Public 
getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  getAllUsers,
  getUsersCount,
  getUserById,
};
