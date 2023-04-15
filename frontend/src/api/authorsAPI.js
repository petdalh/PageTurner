import axios from 'axios';

const baseUrl = "http://localhost:4000/api";

//Get all authors
export const getAllAuthors = () => {
    // Make a GET request to retrieve all authors
    axios.get(`${baseUrl}/author`)
        .then(response => {
            // Handle the response data
            const authors = response.data;
            console.log('All authors:', authors);
            return authors;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

//Get an author by id
export const getAuthorById = (id) => {
    // Make a GET request to retrieve an author by id
    axios.get(`${baseUrl}/author/${id}`)
        .then(response => {
            // Handle the response data
            const author = response.data;
            console.log('Author:', author);
            return author;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

//Get an author by full name
export const getAuthorByFullName = (name) => {
    // Make a GET request to retrieve an author by FullName
    axios.get(`${baseUrl}/author/fullname/${name}`)
        .then(response => {
            // Handle the response data
            const author = response.data;
            console.log('Author:', author);
            return author;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

// create a new author
export const createNewAuthor = (name, birthYear, books) => {
    // Make a POST request to create a new author
    axios.post(`${baseUrl}/author`, {
        name: name,
        birthYear: birthYear,
        books: books
    })
        .then(response => {
            // Handle the response data
            const author = response.data;
            console.log('Created a new author:', author);
            return author;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

// delete an author by id
export const deleteAuthorById = (id) => {
    // Make a DELETE request to delete an author
    axios.delete(`${baseUrl}/author/${id}`)
        .then(() => {
            console.log('Deleted an author:', id);

        }).catch(error => {
            // Handle any errors
            console.error(error);
        });
}

// delete an author by FullName
export const deleteAuthorByFullName = (name) => {
    // Make a DELETE request to delete an author by FullName
    axios.delete(`${baseUrl}/author/fullname/${name}`)
        .then(() => {
            console.log('Deleted an author:', name);
        }).catch(error => {
            // Handle any errors
            console.error(error);
        });
}