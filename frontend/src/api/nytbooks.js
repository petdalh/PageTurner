import { useEffect } from 'react';
import axios from 'axios';

const apiKey = 'XrCIx087EJ5sGfUCIoaM1v5dtGtGxG7H';
const listName = 'hardcover-fiction';
const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/${listName}.json?api-key=${apiKey}`;

export const GetNYTBooks = (setResult) => {
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setResult(response.data.results.books);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
};
