import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    Label,
    makeStyles,
} from "@fluentui/react-components"

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
    image: {
        width: "50px",
        height: "auto",
        marginBottom: "10px",
    },
})

export const ShowBookDialog = ({ book, onResetBook }) => {
    const styles = useStyles()

    if (book === null) {
        return null
    }

    // dialog that shows book info
    // return (
    //     <Dialog modalType="modal" open={book !== null} >
    //         <DialogSurface aria-describedby={undefined}>
    //             <DialogBody>
    //                 <DialogTitle>Book Information</DialogTitle>
    //                 <DialogContent className={styles.content}>
    //                 <img src={book.coverImage} width={100} height={150}/>
    //                     <Label htmlFor={"title-input"}>
    //                         Book title: <large>{book.title}</large>
    //                     </Label>
    //                     <Label htmlFor={"author-input"}>
    //                         Author: <large>{book.author}</large>
    //                     </Label>
    //                     <Label htmlFor={"releaseYear-input"}>
    //                         Release Year: <large>{book.releaseYear}</large>
    //                     </Label>
    //                     <Label htmlFor={"genre-input"}>
    //                         Genre: <large>{book.genre}</large>
    //                     </Label>
    //                     <Label htmlFor={"description-input"}>
    //                         Description: <large>{book.description}</large>
    //                     </Label>
    //                     <Label htmlFor={"pages-input"}>
    //                         # Pages: <small>{book.pages}</small>
    //                     </Label>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <DialogTrigger disableButtonEnhancement>
    //                         <Button appearance="secondary" onClick={onResetBook} >
    //                             Close
    //                         </Button>
    //                     </DialogTrigger>
    //                 </DialogActions>
    //             </DialogBody>
    //         </DialogSurface>
    //     </Dialog>
    // )}
}


