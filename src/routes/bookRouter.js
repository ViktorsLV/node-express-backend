const router = require("express").Router();

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);

router.post("/", bookController.postNewBook);

module.exports = router;
