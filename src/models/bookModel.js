const Joi = require("joi");
const { Schema, model } = require("mongoose");

let bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    genre: {
      type: Array,
      required: false,
      default: 'not specified'
    }
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().max(200).required(),
    author: Joi.string().max(100).required(),
    year: Joi.string().max(4).required(),
  });

  return schema.validate(book);
}

module.exports.validate = validateBook;
module.exports.Book = Book;
