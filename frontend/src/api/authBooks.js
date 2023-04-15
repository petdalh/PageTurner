import axios from "axios";

const baseUrl = "http://localhost:4000/api"; // this is the base url for the backend

export const getAllBooks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${baseUrl}/books`, config);

    // Filter the books based on the user who created them
    const userBooks = response.data.filter((book) => book.user === token.userId);

    return userBooks;
};

export const getBookById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${baseUrl}/books/${id}`, config);

    // Check if the book belongs to the user
    if (response.data.user !== token.userId) {
        throw new Error('Unauthorized access');
    }

    return response.data;
};

export const getBookByISBN = async (isbn, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${baseUrl}/books/isbn/${isbn}`, config);

    // Check if the book belongs to the user
    if (response.data.user !== token.userId) {
        throw new Error('Unauthorized access');
    }

    return response.data;
};

export const getBookByTitle = async (title, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${baseUrl}/books/title/${title}`, config);

    // Filter the books based on the user who created them
    const userBooks = response.data.filter((book) => book.user === token.userId);

    return userBooks;
};

export const createNewBook = async (bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${baseUrl}/books`, bookData, config);

    return response.data;
};

export const deleteBookById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(`${baseUrl}/books/${id}`, config);

    return response.data;
};
