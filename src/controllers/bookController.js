const { Book, validate } = require("../models/bookModel");

// @route   GET /api/books
// @access  Public
getAllBooks = async (req, res, next) => {
  const queryGenre = req.query.genre // to get by genre query (?genre=thriller)
  try {
    const allBooks = queryGenre ? await Book.find({genre: {
      $in: [queryGenre]
    }}) : await Book.find({});
    res.status(200).json(allBooks);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// @route   GET /api/books/count
// @access  Public
getBooksCount = async (req, res, next) => {
  try {
    const bookCount = await Book.countDocuments({});
    res.status(200).json({ count: bookCount });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// @route   GET /api/books/:id
// @access  Public
getOneBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) res.status(404).json("Not Found");
    res.status(200).json(book);
  } catch (err) {
    res.status(404).send("Book not found");
  }
};

// @route   GET /api/books/stats -- gets statistics on how many books have been published each month
// @access  Public
getBookStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const bookStats = await Book.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      { $group: { 
          _id: "$month", // returns month number
          total: { $sum: 1 } 
        }
      },
    ]);
    res.status(200).json(bookStats);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

// @route   POST /api/books
// @access  Public
postNewBook = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, author, year, genre } = req.body;
  const newBook = new Book({
    title,
    author,
    year,
    genre
  });

  try {
    const book = await newBook.save();

    if (!book) throw new Error("Something went wrong, try again");
    res.status(200).send(book);
  } catch (err) {
    res.status(404).json({
      message: error?.message,
    });
  }
};

// @route   DELETE /api/books/:id
// @access  Public
deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: `Book removed:`, book });
  } catch (err) {
    res.status(404);
    throw new Error("Book not found");
  }
};

// @route   PUT /api/books/:id
// @access  Public
updateBook = async (req, res, next) => {
  const { title, author, year, genre } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        year,
        genre
      },
      {
        new: true,
      }
    );
    if (!book) {res.status(404).json('Book not found')}
    res.status(200).json({ message: `Book updated:`, book });
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};

module.exports = {
  getAllBooks,
  getBooksCount,
  getOneBook,
  getBookStats,
  postNewBook,
  deleteBook,
  updateBook,
};
