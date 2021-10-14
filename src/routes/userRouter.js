const router = require("express").Router();

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);

router.get("/count", userController.getUsersCount);

router.get("/:id", userController.getUserById);

module.exports = router;
