const mongoose = require('mongoose');
const Review = require('../../models/Review'); // Update the import path if needed
const Book = require('../../models/Book'); // Update the import path if needed
const Author = require('../../models/Author'); // Update the import path if needed
const User = require('../../models/User'); // Update the import path if needed
const { startDB, stopDB } = require('../../setupTests'); // Update the import path if needed

beforeAll(async () => {
  await startDB();
});

afterAll(async () => {
  await stopDB();
});

describe('Review Model', () => {
  afterEach(async () => {
    await Review.deleteMany({});
    await Book.deleteMany({});
    await Author.deleteMany({});
    await User.deleteMany({});
  });

  test('should create a review successfully', async () => {
    const authorData = {
      name: 'John Doe',
      birthYear: 1990,
    };

    const author = new Author(authorData);
    const savedAuthor = await author.save();

    const bookData = {
      title: 'Book Title',
      author: savedAuthor._id,
      releaseYear: 2020,
      genre: 'Fiction',
      description: 'A fictional book.',
      pages: 300,
      coverImage: 'cover.jpg',
      isbn: '1234567890',
    };

    const book = new Book(bookData);
    const savedBook = await book.save();

    const userData = {
      name: 'John Doe', // Add the name field
      username: 'johndoe',
      email: 'john@example.com',
      password: '123456',
      // Add any other user fields if needed
    };

    const user = new User(userData);
    const savedUser = await user.save();

    const reviewData = {
      book: savedBook._id,
      user: savedUser._id,
      rating: 4,
      comment: 'Great book!',
    };

    const review = new Review(reviewData);
    const savedReview = await review.save();

    expect(savedReview._id).toBeDefined();
    expect(savedReview.book).toEqual(savedBook._id);
    expect(savedReview.user).toEqual(savedUser._id);
    expect(savedReview.rating).toBe(reviewData.rating);
    expect(savedReview.comment).toBe(reviewData.comment);
  });

  // Add more test cases if needed
});