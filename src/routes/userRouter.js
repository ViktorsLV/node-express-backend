const router = require("express").Router();
const userController = require("../controllers/userController");
const { auth } = require("../middlewares/authentication");

router.get("/", auth, userController.getAllUsers);

router.get("/count", auth, userController.getUsersCount);

router.get("/:id", auth, userController.getUserById);

module.exports = router;
