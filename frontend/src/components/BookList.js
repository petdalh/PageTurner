import { useState } from "react"
import { BookOpen24Regular, CalendarLtr24Regular, PersonEdit24Regular, Star24Filled } from "@fluentui/react-icons"
import {
    TableBody,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
} from "@fluentui/react-components"

import { BookRow } from "./BookRow"

import { ShowBookDialog } from "./ShowBookDialog"

const columns = [
    { columnKey: "coverImage" },
    { columnKey: "title", label: "Book title", icon: <BookOpen24Regular /> },
    { columnKey: "author", label: "Author", icon: <PersonEdit24Regular /> },
    { columnKey: "releaseYear", label: "Release Year", icon: <CalendarLtr24Regular /> },
    { columnKey: "averageRating", label: "PageTurner Rating" },
];

export const BookList = ({ books }) => {

    const [currentBook, setCurrentBook] = useState(null)

    // function that sends current book to book you click on
    // triggers dialog to open 
    const handleBookClick = (book) => {
        console.log("click book", book)
        setCurrentBook(book)
        window.location.href = "/myratings/" + book.isbn

    }

    // sets current book to null
    // used when exiting dialog
    const handleResetBook = () => {
        setCurrentBook(null)
    }

    // logic for displaying list of books using a table
    return (
        <div>
            <ShowBookDialog book={currentBook} onResetBook={handleResetBook} />
            <Table arial-label="Default table">
                <TableHeader>
                    <TableRow style={{ borderBottom: '2px solid rgba(0, 128, 0, 0.3)' }}>
                        {columns.map((column) => (
                            <TableHeaderCell key={column.columnKey}>
                                <TableCellLayout media={column.icon}>
                                    {column.label}
                                </TableCellLayout>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book, index) => <BookRow key={`${index}-${book.title}`} book={book} onBookClick={handleBookClick} />)}
                </TableBody>
            </Table>
        </div>
    )
}
