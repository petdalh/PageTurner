import { useState, useEffect } from "react"
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from "@fluentui/react-components"
import axios from "axios"
import { getBooks } from "../api/books"
import { DisplayBookBig } from "./DisplayBookBig"




export const TopList = () => {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const books = await getBooks();
      const sortedBooks = books
        .map((book) => ({
          ...book,
          averageRating: book.ratingCount > 0 ? book.ratingSum / book.ratingCount : 0,
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 10);
      setTopBooks(sortedBooks);
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Top 10 Books</h1>
      </div>
      <div className="top-list">
        {topBooks.map((book) => (
          <DisplayBookBig key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};

export default TopList;





