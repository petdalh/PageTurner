import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookList } from "../components/BookList";
import { getBooks } from "../api/books";

export const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    getBooks().then((books) => {
      setBooks(books);
    });
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [books, searchTerm]);

  return (
    <div className="page page-enter">
      <BookList books={filteredBooks} />
    </div>
  );
};