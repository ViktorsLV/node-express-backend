const { Book, validate } = require("../model/bookModel");

getAllBooks = async (req, res, next) => {
  try {
    const allBooks = await Book.find({});
    res.json(allBooks);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

postNewBook = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newBook = new Book(req.body);
  
  try {
    const book = await newBook.save();

    if (!book) throw new Error("Something went wrong, try again");
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  postNewBook,
};
