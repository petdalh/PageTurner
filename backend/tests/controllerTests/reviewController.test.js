const { createReview } = require('../../controllers/reviewController');
const Review = require('../../models/Review');
const Book = require('../../models/Book');
const User = require('../../models/User');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const { startDB, stopDB } = require('../../setupTests'); // Update the import path if needed

beforeAll(async () => {
  await startDB();
});

afterAll(async () => {
  await stopDB();
});

describe('createReview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a review successfully', async () => {
    // Arrange
    const book = {
      _id: mongoose.Types.ObjectId(),
      title: 'Book 1',
      ratingCount: 0,
      ratingSum: 0,
    };

    const user = {
      _id: mongoose.Types.ObjectId(),
      username: 'User 1',
    };

    const requestBody = {
      book: book._id,
      user: user._id,
      rating: 4,
      comment: 'Great book!',
    };

    const updatedBook = {
      ...book,
      ratingSum: book.ratingSum + requestBody.rating,
      ratingCount: book.ratingCount + 1,
    };

    Book.findById = jest.fn().mockResolvedValue(book);
    User.findById = jest.fn().mockResolvedValue(user);
    Review.prototype.save = jest.fn().mockResolvedValue({ ...requestBody });
    Book.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedBook);

    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/review',
      body: requestBody,
    });

    const res = httpMocks.createResponse();

    // Act
    await createReview(req, res);

    // Assert
    expect(Book.findById).toHaveBeenCalledWith(book._id);
    expect(User.findById).toHaveBeenCalledWith(user._id);
    expect(Review.prototype.save).toHaveBeenCalled();
    expect(Book.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);

    const receivedData = res._getJSONData();

    expect(receivedData).toEqual({
      review: { ...requestBody, book: requestBody.book.toString(), user: requestBody.user.toString() },
      book: { ...updatedBook, _id: updatedBook._id.toString() },
    });
  }, 10000);

  // Add more test cases if needed
});