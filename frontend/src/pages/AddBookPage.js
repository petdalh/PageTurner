import {AddBook} from "../components/AddBook"
import {useState} from "react"

export const AddBookPage = () => {

      const [books, setBooks] = useState([]);

  const handleAddBook = (title, author, releaseYear, genre, description, pages, coverImage) => {
    const newBook = {
      title: title,
      author: author,
      releaseYear: releaseYear,
      genre: genre,
      description: description,
      pages: pages,
      coverImage: coverImage
    };
    try {
      setBooks([...books, newBook]);
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
        <AddBook onAddBook={handleAddBook}/>
        </div>
    );
  }