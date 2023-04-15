import { TableCell, TableRow } from "@fluentui/react-components";
import { Star24Filled } from "@fluentui/react-icons";


export const BookRow = ({ book, onBookClick }) => {

    const handleClick = (event) => {
        if (onBookClick) {
            onBookClick(book);
        }
    }

    return (
        <TableRow style={{ borderBottom: '1px solid rgba(0, 128, 0, 0.2)' }} onClick={handleClick}>
            <TableCell>
                <img src={book.coverImage} width={100} height={150}/>
            </TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.releaseYear}</TableCell>
            <TableCell> {<Star24Filled style={{ color: "f3ce13" }} />}     {book.ratingCount > 0 
    ? `${(book.ratingSum / book.ratingCount).toFixed(1)} / 10` 
    : "No reviews"}</TableCell>
        </TableRow>
    )
}


