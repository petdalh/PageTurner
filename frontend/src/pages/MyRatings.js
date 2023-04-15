import { useState, useEffect, useContext } from "react";
import { BookList } from "../components/BookList";
import { getBooks } from "../api/books";
import { AddBook } from "../components/AddBook";
import { getBooksByUser } from "../api/booksAPI";
import { getUserProfile } from "../api/users";
import AuthContext from "../context/AuthProvider";


export const MyRatings = () => {
  const [books, setBooks] = useState([]);
  //const [userProfile, setUserProfile] = useState(null);
  //const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { id } = await getUserProfile();
        console.log("USER IN MYRATINGS", id);
        const booksData = await getBooksByUser(id);
        console.log("BOOKS IN MYRATINGS", booksData);
        setBooks(booksData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="library-controls">
        <h1>My Ratings</h1>
      </div>
      <div>
        <BookList books={books} />
      </div>
    </>
  );
};
