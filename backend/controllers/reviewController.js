const Review = require('../models/Review')
const Book = require('../models/Book')
const User = require('../models/User')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler');


// @desc    POST a review
// @route   POST /review
// @access  Public
const createReview = asyncHandler(async (req, res) => {
  // Extract the necessary data from the request body
  const { book, user, rating, comment } = req.body;

  // Check if the book with the given bookId exists in the database
  const book1 = await Book.findById(book);
  if (!book1) {
    res.status(400);
    throw new Error('Book not found');
  }

  // Check if the user with the given userId exists in the database
  const user1 = await User.findById(user);
  if (!user1) {
    res.status(400);
    throw new Error('User not found');
  }

  // Create a new review with the extracted data and save it to the database
  const review = new Review({
    book: book,
    user: user,
    rating,
    comment
  });
  const savedReview = await review.save();

  // Update the associated book's ratingSum and ratingCount fields
  const updatedBook = await Book.findByIdAndUpdate(
    book,
    {
      $inc: { ratingSum: rating, ratingCount: 1 }
    },
    { new: true }
  );

  // Return the saved review and updated book data
  res.status(201).json({
    review: savedReview,
    book: updatedBook
  });
});

// @desc    GET all reviews for a specific book
// @route   GET /reviews/:bookId
// @access  Public
const getAllReviewByBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  // Find all reviews for the given book ID
  const reviews = await Review.find({ book: bookId }).populate('user');

  // Return the reviews to the client
  res.status(200).json(reviews);
})

// @desc    GET all reviews
// @route   GET /reviews
// @access  Public
const getAllReviews = asyncHandler(async (req, res) => {
  // Find all reviews in the database
  const reviews = await Review.find().populate('user');

  // Return the reviews to the client
  res.status(200).json(reviews);
});

// @desc    DELETE a review by ID
// @route   DELETE /reviews/:id
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;

  // Find the review in the database
  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Delete the review from the database
  await review.remove();

  // Update the associated book's ratingSum and ratingCount
  const bookId = review.book;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  book.ratingSum -= review.rating;
  book.ratingCount--;

  await book.save();

  // Return a success message to the client
  res.status(200).json({ message: 'Review deleted successfully' });
});


module.exports = {
  createReview,
  getAllReviewByBook,
  getAllReviews,
  deleteReview
}


