const { getAllBooks } = require('../../controllers/bookController');
const Book = require('../../models/Book');
const httpMocks = require('node-mocks-http');
const app = require('../../../frontend/src/app');



jest.mock('../../models/Book');




describe('getAllBooks', () => {
  test('should get all books successfully', async () => {
    // Arrange
    const books = [
      {
        _id: 'book1Id',
        title: 'Book 1',
        author: { _id: 'author1Id', name: 'Author 1' },
        // ... other book properties
      },
      {
        _id: 'book2Id',
        title: 'Book 2',
        author: { _id: 'author2Id', name: 'Author 2' },
        // ... other book properties
      },
    ];

    Book.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(books),
      }),
    });
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    // Act
    await getAllBooks(req, res);

    // Assert
    expect(Book.find).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual([
      {
        _id: 'book1Id',
        title: 'Book 1',
        author: 'Author 1',
        // ... other book properties
      },
      {
        _id: 'book2Id',
        title: 'Book 2',
        author: 'Author 2',
        // ... other book properties
      },
    ]);
  });
});

