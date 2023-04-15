
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import { getBookByISBN } from "../api/books";
import { DisplayBook } from "../components/DisplayBook"
import { AddReview } from "../components/AddReview"
import { ReviewList } from "../components/ReviewList"
import { getAllReviewByBook } from "../api/reviews"
import AuthContext from "../context/AuthProvider";
import { getUserProfile } from "../api/users";

export const BookPage = () => {
  const { isbn } = useParams()
  const [reviews, setReviews] = useState([])
  const [book, setBook] = useState(null)
  //const [userProfile, setUserProfile] = useState(null)
  // USER INFO
  const { user } = useContext(AuthContext)
  // console.log("USER INFO", user)
  // const [user, setUser] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      const book = await getBookByISBN(isbn)
      setBook(book)
      // console.log("BOOKID", book._id)
      const reviews = await getAllReviewByBook(book._id)
      // console.log("REVIEWS", reviews)

      const user = await getUserProfile()
      // console.log("USER IN REVIEW", user)
      // console.log("USER IN ID", user.id)



      if (reviews) {
        setReviews(reviews)
      }
    }
    fetchData()
  }, [])

  const handleAddReview = (bookID, userID, rating, comment) => {
    const newReview = {
      bookID: bookID,
      userID: userID,
      rating: rating,
      comment: comment
    };
    console.log(newReview)
    try {
      setReviews([...reviews, newReview]);
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };


  const element = book ? <DisplayBook book={book} /> : null

  return (
    <div >
      {element}
      {user ? (
        <AddReview book={book} user={user} onAddReview={handleAddReview} />
      ) : (
        <p className="no-user-review">Please log in to add a review</p>
      )}
      <ReviewList reviews={reviews} user={user} />
    </div>
  )
}
