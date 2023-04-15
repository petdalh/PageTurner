import axios from 'axios';


const baseUrl = "http://localhost:4000/api";


////////////////////////// - It may be a good idea to change all these to async/await - //////////////////////////
export const getBooks = () => {
    
    return axios.get(`${baseUrl}/books`)
    .then(response => {
      // Return the books data as JSON
      //console.log("get worked")
      let books = response.data
      console.log(books)
      return books;
      //return response.data;
    })
    .catch(error => {
      // Handle any errors
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


export const newBook = (title, author, year, genre, desc, pages, coverImage, isbn) => {
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

