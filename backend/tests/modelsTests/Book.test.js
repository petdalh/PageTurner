const mongoose = require('mongoose');
const Book = require('../../models/Book'); // Update the import path if needed
const Author = require('../../models/Author'); // Update the import path if needed
const { startDB, stopDB } = require('../../setupTests'); // Update the import path if needed

beforeAll(async () => {
  await startDB();
});

afterAll(async () => {
  await stopDB();
});

describe('Book Model', () => {
  afterEach(async () => {
    await Book.deleteMany({});
    await Author.deleteMany({});
  });

  test('should create a book successfully', async () => {
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

    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe(bookData.title);
    expect(savedBook.author).toEqual(savedAuthor._id);
    expect(savedBook.releaseYear).toBe(bookData.releaseYear);
    expect(savedBook.genre).toBe(bookData.genre);
    expect(savedBook.description).toBe(bookData.description);
    expect(savedBook.pages).toBe(bookData.pages);
    expect(savedBook.coverImage).toBe(bookData.coverImage);
    expect(savedBook.isbn).toBe(bookData.isbn);
    expect(savedBook.ratingSum).toBe(0);
    expect(savedBook.ratingCount).toBe(0);
  });

  // Add more test cases if needed
});