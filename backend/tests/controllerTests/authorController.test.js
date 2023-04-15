const { getAuthors } = require('../../controllers/authorController');
const Author = require('../../models/Author');
const httpMocks = require('node-mocks-http');

jest.mock('../../models/Author');

describe('getAuthors', () => {
  test('should get all authors successfully', async () => {
    // Arrange
    const authors = [
      {
        _id: 'author1Id',
        name: 'Author 1',
        // ... other author properties
      },
      {
        _id: 'author2Id',
        name: 'Author 2',
        // ... other author properties
      },
    ];

    Author.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(authors),
    });
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    // Act
    await getAuthors(req, res);

    // Assert
    expect(Author.find).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual([
      {
        _id: 'author1Id',
        name: 'Author 1',
        // ... other author properties
      },
      {
        _id: 'author2Id',
        name: 'Author 2',
        // ... other author properties
      },
    ]);
  });
});