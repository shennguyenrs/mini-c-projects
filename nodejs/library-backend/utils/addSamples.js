// Models
const Author = require('../models/author');
const Book = require('../models/book');
//const User = require('../models/user');

// Sample datatbase
const sampleAuthors = require('../sampleDB/Authors');
const sampleBooks = require('../sampleDB/Books');

const addAuthors = () => {
  // Add authors
  // Using Promise.all to wait to finish
  // while iteration array
  return Promise.all(
    // forEach - excutes a provided function once for each element
    // It does not return anything
    // map - excutes a provided function for each element
    // return the value to a new array
    sampleAuthors.map(async (item) => {
      const newAuthor = new Author({
        name: item.name,
        born: item.born ? item.born : null,
      });

      await newAuthor.save();
    })
  );
};

const addBooks = () => {
  return Promise.all(
    sampleBooks.map(async (item) => {
      // Find the author information
      let author = await Author.findOne({ name: item.author });

      // Create new author if not found
      if (author === null) {
        const newAuthor = new Author({
          name: item.author,
          born: null,
        });

        const savedAuthor = await newAuthor.save();

        author = savedAuthor;
      }

      const newBook = new Book({
        title: item.title,
        published: item.published,
        author: author.id,
        genres: item.genres,
      });

      await newBook.save();
    })
  );
};

module.exports = { addAuthors, addBooks };
