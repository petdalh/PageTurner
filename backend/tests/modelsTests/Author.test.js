const mongoose = require('mongoose');
const Author = require('../../models/Author'); // Update the import path if needed
const { startDB, stopDB } = require('../../setupTests'); // Update the import path if needed

beforeAll(async () => {
  await startDB();
});

afterAll(async () => {
  await stopDB();
});

describe('Author Model', () => {
  afterEach(async () => {
    await Author.deleteMany({});
  });

  test('should create an author successfully', async () => {
    const authorData = {
      name: 'John Doe',
      birthYear: 1990,
    };

    const author = new Author(authorData);
    const savedAuthor = await author.save();

    expect(savedAuthor._id).toBeDefined();
    expect(savedAuthor.name).toBe(authorData.name);
    expect(savedAuthor.birthYear).toBe(authorData.birthYear);
  });

  test('should require name field', async () => {
    const authorData = {
      birthYear: 1990,
    };

    const author = new Author(authorData);

    try {
      await author.save();
    } catch (error) {
      expect(error.errors.name).toBeDefined();
      expect(error.errors.name.message).toBe('Path `name` is required.');
    }
  });

  test('should not require birthYear field', async () => {
    const authorData = {
      name: 'John Doe',
    };

    const author = new Author(authorData);
    const savedAuthor = await author.save();

    expect(savedAuthor._id).toBeDefined();
    expect(savedAuthor.name).toBe(authorData.name);
    expect(savedAuthor.birthYear).toBeUndefined();
  });
});