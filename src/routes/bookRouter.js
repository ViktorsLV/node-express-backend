const router = require("express").Router();

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getOneBook);

router.post("/", bookController.postNewBook);

router.delete("/:id", bookController.deleteBook);

router.put("/:id", bookController.updateBook);

module.exports = router;
