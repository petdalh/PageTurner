
export const fetchBookCover = async (bookTitle, author) => {
    const encodedTitle = encodeURIComponent(bookTitle);
    const encodedAuthor = encodeURIComponent(author);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}+inauthor:${encodedAuthor}&fields=items(volumeInfo(imageLinks(thumbnail)))`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.items && data.items.length > 0) {
            return data.items[0].volumeInfo.imageLinks.thumbnail
        }
        return ""
    } catch (error) {
        console.error(error)
        return ""
    }
}

export const fetchBookInfo = async (bookTitle, author) => {
    const encodedTitle = encodeURIComponent(bookTitle);
    const encodedAuthor = encodeURIComponent(author);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedTitle}+inauthor:${encodedAuthor}&fields=items(volumeInfo(imageLinks(thumbnail),industryIdentifiers))`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.items && data.items.length > 0) {
            const firstBook = data.items[0].volumeInfo
            console.log("FIRST BOOKS", firstBook)
            const isbn = firstBook.industryIdentifiers.find(identifier => identifier.type === "ISBN_13").identifier
            const coverImage = firstBook.imageLinks.thumbnail
            return { isbn: isbn, coverImage: coverImage }
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}

