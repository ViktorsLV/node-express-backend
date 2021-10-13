const Joi = require("joi");
const { Schema, model } = require("mongoose");

let bookSchema = new Schema({
  title: String,
  author: String,
  year: String,
});

const Book = model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    author: Joi.string().max(255).required(),
    year: Joi.string().max(4).required(),
  });

  return schema.validate(book);
}

module.exports.validate = validateBook;
module.exports.Book = Book;
