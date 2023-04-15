const Book = require('../models/Book');
const Author = require('../models/Author');
const User = require('../models/User');
const Review = require('../models/Review');
const asynHandler = require('express-async-handler');

// @desc    Get all books
// @route   GET /books
// @access  Public
const getAllBooks = asynHandler(async (req, res) => {

  try {
    // Find all books, populate author field
    const books = await Book.find().sort({ createdAt: -1 }).populate('author', 'name')

    // Map through each book and replace author id with author name
    const booksWithAuthorName = books.map(book => {
      return {
        _id: book._id,
        title: book.title,
        author: book.author?.name, // get the name field of the author object
        releaseYear: book.releaseYear,
        genre: book.genre,
        description: book.description,
        pages: book.pages,
        coverImage: book.coverImage,
        isbn: book.isbn,
        ratingSum: book.ratingSum,
        ratingCount: book.ratingCount,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        __v: book.__v
      }
    })

    // Send books with author name as JSON response
    res.json(booksWithAuthorName)
  } catch (error) {
    // Handle any errors
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }

  /*const books = await Book.find({}).sort({ createdAt: -1 }).exec()

  // If no books found
  if (!books?.length) {
      res.status(400).json({ message: 'No books found' })
  }

  // Return the books
  res.status(200).json(books)
  */

})

// @desc    Get a book by id
// @route   GET /books/:id
// @access  Public
const getBookById = asynHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Book ID required' })
  }

  try {
    const book = await Book.findById(req.params.id)
      .populate('author', 'name') // only include author name in response

    if (!book) {
      // Return an error response if the book is not found
      return res.status(404).json({ message: 'Book not found' })
    }

    // Return the book as JSON
    res.json({
      _id: book._id,
      title: book.title,
      author: book.author?.name,
      releaseYear: book.releaseYear,
      genre: book.genre,
      description: book.description,
      pages: book.pages,
      coverImage: book.coverImage,
      isbn: book.isbn,
      ratingSum: book.ratingSum,
      ratingCount: book.ratingCount,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      __v: book.__v
    })
  } catch (err) {
    // Return an error response if there's an error
    res.status(500).json({ message: err.message })
  }
})

// @desc    Get a book by title
// @route   GET /books/title/:title
// @access  Public
const getBookByTitle = asynHandler(async (req, res) => {
  const { title } = req.params

  const regex = new RegExp('^' + title + '$', 'i');
  const book = await Book.findOne({ title: regex })
    .populate('author', 'name')
    //.populate('user', 'email') // populate author field with name property only
    .exec();

  if (!book) {
    res.status(400).json({ message: 'No book found' })
  }

  res.status(200).json({
    _id: book._id,
    title: book.title,
    author: book.author?.name,
    releaseYear: book.releaseYear,
    genre: book.genre,
    description: book.description,
    pages: book.pages,
    coverImage: book.coverImage,
    isbn: book.isbn,
    ratingSum: book.ratingSum,
    ratingCount: book.ratingCount,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    __v: book.__v
  });

})

// @desc    Get a book by isbn
// @route   GET /books/isbn/:isbn
// @access  Public
const getBookByISBN = asynHandler(async (req, res) => {
  const { isbn } = req.params

  const regex = new RegExp('^' + isbn + '$', 'i');
  const book = await Book.findOne({ isbn: regex })
    .populate('author', 'name') // populate author field with name property only
    .exec();

  if (!book) {
    res.status(400).json({ message: 'No book found' })
  }

  res.status(200).json({
    _id: book._id,
    isbn: book.isbn,
    title: book.title,
    author: book.author?.name,
    releaseYear: book.releaseYear,
    genre: book.genre,
    description: book.description,
    pages: book.pages,
    coverImage: book.coverImage,
    ratingSum: book.ratingSum,
    ratingCount: book.ratingCount,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    __v: book.__v
  });

})

// @desc    Get all books reviewed by a specific user.
// @param   user id
// @return  array of books
// @route   GET /books/user/:id
// @access  Public
const getBooksByUser = asynHandler(async (req, res) => {
  // Get the user id from the request parameters
  const userId = req.params.id;

  // Find all reviews written by the user
  const reviews = await Review.find({ user: userId });

  // Extract the book ids from the reviews
  const bookIds = reviews.map(review => review.book);

  // Find all books with ids that match the book ids from the reviews
  const books = await Book.find({ _id: { $in: bookIds } }).sort({ createdAt: -1 })
    // Populate the 'author' field with the 'name' field of the author
    .populate('author', 'name')
    .exec();

    // Map through each book and replace author id with author name
    const booksWithAuthorName = books.map(book => {
      return {
        _id: book._id,
        title: book.title,
        author: book.author?.name, // get the name field of the author object
        releaseYear: book.releaseYear,
        genre: book.genre,
        description: book.description,
        pages: book.pages,
        coverImage: book.coverImage,
        isbn: book.isbn,
        ratingSum: book.ratingSum,
        ratingCount: book.ratingCount,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        __v: book.__v
      }
    })

  // Send the books array as a JSON response
  res.json(booksWithAuthorName);
});




// @desc    Create a new book
// @route   POST /books/
// @access  Public
const createNewBook = asynHandler(async (req, res) => {
  try {
    let { isbn, title, author, releaseYear, genre, description, pages, coverImage } = req.body;

    // Check if author name already exists in the database
    let existingAuthor = await Author.findOne({ name: author });

    // If author exists, use the existing author document
    // Otherwise, create a new author document
    let bookAuthor = existingAuthor ? existingAuthor : await Author.create({ name: author });

    let book = new Book({
      isbn,
      title,
      author: bookAuthor._id,
      releaseYear,
      genre,
      description,
      pages,
      coverImage
    });

    await book.save();

    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @desc    Update a book
// @route   PATCH /books/:id
// @access  Public
const updateBook = asynHandler(async (req, res) => {
  const { id } = req.params
  const { title, author, releaseYear, genre, description, pages, coverImage, isbn, ratingSum, ratingCount } = req.body

  const book = await Book.findById(id).exec()

  if (!book) {
    res.status(400).json({ message: 'No book found' })
  }

  // Checking for duplicate titles
  const duplicate = await Book.findOne({ title }).lean().exec()

  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate book title' })
  }

  book.title = title
  book.releaseYear = releaseYear
  book.genre = genre
  book.description = description
  book.pages = pages
  book.coverImage = coverImage
  book.isbn = isbn
  book.ratingSum = ratingSum
  book.ratingCount = ratingCount

  const updatedBook = await book.save()
  res.json(`'${updatedBook.title}' updated`)
})

// @desc    Delete a book
// @route   DELETE /books/:id
// @access  Public
const deleteBook = asynHandler(async (req, res) => {
  const { id } = req.params

  const book = await Book.findById(id).exec()

  if (!book) {
    res.status(400).json({ message: 'No book found' })
  }

  await book.deleteOne()
  res.json(`'${book.title}' deleted`)
})

// @desc    Delete a book by title
// @route   DELETE /books/:id
// @access  Public
const deleteBookByTitle = asynHandler(async (req, res) => {
  const { title } = req.params; // Extract title parameter from request
  const regex = new RegExp('^' + title + '$', 'i'); // Create regex for case-insensitive search
  const book = await Book.findOneAndDelete({ title: regex }); // Find and delete the book matching the title regex
  if (!book) { // If no book was found to delete, return an error
    res.status(400).json({ message: 'No book found' });
  } else {
    res.status(200).json({ message: `Book with title ${title} deleted successfully` }); // If book was successfully deleted, return success message
  }
});





module.exports = {
  getAllBooks,
  getBookById,
  getBookByISBN,
  getBookByTitle,
  getBooksByUser,
  createNewBook,
  updateBook,
  deleteBook,
  deleteBookByTitle
}

