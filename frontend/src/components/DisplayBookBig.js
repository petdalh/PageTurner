
import { Star24Filled } from '@fluentui/react-icons'
export const DisplayBookBig = ({ book }) => {

    if (book === null) {
        return null
    }

    return (
        <section style={{ display: 'flex', flexDirection: 'row', gap: '70px', justifyContent: 'center', alignItems: 'center', paddingRight: '50px', paddingTop: "40px" }}>

            <img src={book.coverImage} alt={book.title} style={{ width: 160, height: 250, justifyContent: "left" }} />
            <div style={{ padding: '20px', justifyContent: 'left', alignItems: 'left', borderRadius: '10px', maxWidth: '500px', display: 'flex', flexDirection: 'column', border: 'none', backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h2 style={{ marginBottom: '10px' }}>{book.title}</h2>
                    <p style={{ marginBottom: '5px' }}>{book.author}</p>
                    <p style={{ marginBottom: '5px' }}>{book.releaseYear}</p>
                    <p style={{ 
                        marginBottom: '10px',
                        maxHeight: '150px', // Set a fixed height for the description div
                        minWidth: '500px', // Set a fixed width for the description div
                        overflow: 'auto', // Set overflow to auto
                        marginBottom: '10px',
                
                    }}>{book.description}</p>
                    <p style={{ marginBottom: '10px' }}>Pages: {book.pages}</p>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Star24Filled style={{ color: "f3ce13" }} />
                        <p style={{ marginLeft: '5px', marginBottom: '0px', fontSize: '15px' }}>{book.ratingCount > 0 ? (book.ratingSum / book.ratingCount).toFixed(1) : 0}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
