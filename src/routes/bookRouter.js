const router = require("express").Router();
const bookController = require("../controllers/bookController");
const { auth } = require("../middlewares/authentication");
const { admin } = require("../middlewares/admin");

router.get("/", bookController.getAllBooks);

router.get("/count", bookController.getBooksCount);

router.get("/:id", bookController.getOneBook);

router.post("/", bookController.postNewBook);

router.delete("/:id", auth, admin, bookController.deleteBook);

router.put("/:id", auth, admin, bookController.updateBook);

module.exports = router;
