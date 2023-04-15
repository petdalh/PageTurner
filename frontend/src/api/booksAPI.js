import axios from "axios";

const baseUrl = "http://localhost:4000/api"; // this is the base url for the backend



////////////////////////// - It may be a good idea to change all these to async/await - //////////////////////////
//Get all books
export const getAllBooks = () => {
  return axios.get(`${baseUrl}/books`)
    .then(response => {
      // Return the books data as JSON
      return response.data;
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
};

//Get a book by id
export const getBookById = (id) => {
  return axios.get(`${baseUrl}/books/${id}`)
    .then(response => {
      //console.log("Id worked")
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

//Get a books reviewed by specific user
export const getBooksByUser = (id) => {
  return axios.get(`${baseUrl}/books/user/${id}`)
    .then(response => {
      console.log("Books by user", response.data)
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

export const getBookByISBN = (isbn) => {

  return axios.get(`${baseUrl}/books/isbn/${isbn}`)
    .then(response => {
      // Return the books data as JSON
      //console.log("get worked")
      let book = response.data
      console.log(book)
      return book;
      //return response.data;
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}


// Get a book by title
export const getBookByTitle = (title) => {
  return axios.get(`${baseUrl}/books/title/${title}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

// Create a new book
export const createNewBook = (title, author, year, genre, desc, pages, coverImage, isbn) => {
  return axios.post(`${baseUrl}/books`, {
    title: title,
    author: author,
    releaseYear: year,
    genre: genre,
    description: desc,
    pages: pages,
    coverImage: coverImage,
    isbn: isbn
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

// Delete a book by id
export const deleteBookById = (id) => {
  return axios.delete(`${baseUrl}/books/${id}`)
    .then(() => {
      console.log(`Book with id ${id} deleted`);
    })
    .catch(error => {
      console.error(error);
    });
}