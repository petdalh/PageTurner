const { getAllUsers } = require('../../controllers/userController');
const User = require('../../models/User');
const httpMocks = require('node-mocks-http');

describe('getAllUsers', () => {
  test('should get all users successfully', async () => {
    // Arrange
    const users = [
      {
        _id: 'user1Id',
        username: 'User 1',
        email: 'user1@example.com',
        // ... other user properties
      },
      {
        _id: 'user2Id',
        username: 'User 2',
        email: 'user2@example.com',
        // ... other user properties
      },
    ];

    const execMock = jest.fn().mockResolvedValue(users);
    User.find = jest.fn(() => ({ exec: execMock }));
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    // Act
    await getAllUsers(req, res);

    // Assert
    expect(User.find).toHaveBeenCalled();
    expect(execMock).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(users);
  });

  test('should return 400 and message if no users found', async () => {
    // Arrange
    const execMock = jest.fn().mockResolvedValue([]);
    User.find = jest.fn(() => ({ exec: execMock }));
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
  
    try {
      // Act
      await getAllUsers(req, res);
    } catch (error) {
      // Assert
      expect(User.find).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalled();
      expect(res.statusCode).toBe(400);
      expect(error.message).toBe('No users found');
    }
  });
});