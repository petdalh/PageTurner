const mongoose = require('mongoose');
const User = require('../../models/User'); // Update the import path if needed
const { startDB, stopDB } = require('../../setupTests'); // Update the import path if needed

beforeAll(async () => {
  await startDB();
});

afterAll(async () => {
  await stopDB();
});

describe('User Model', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  test('should create a user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      isAdmin: false,
      // Add any other user fields if needed
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.isAdmin).toBe(userData.isAdmin);
    // If you have more fields, add more expect statements here
  });

  // Add more test cases if needed
});
