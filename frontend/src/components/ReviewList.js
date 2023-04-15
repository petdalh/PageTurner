
import { Star24Filled } from '@fluentui/react-icons'
import {useContext, useEffect} from 'react'
import { getUserProfile } from "../api/users";
import AuthContext from "../context/AuthProvider";

export const ReviewList = ({ reviews }) => {

    const { user, setUser } = useContext(AuthContext)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserProfile()
                setUser(user)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    }, [])

    if (user) {
        const myReviews = reviews.filter(r => r.user.email === user.email)
        const otherReviews = reviews.filter(r => r.user.email !== user.email)
        reviews = [...myReviews, ...otherReviews]
    }
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
            <h1>Book Reviews</h1>
            {reviews.map((review) => {
                 return (
                                    <div key={review.id} style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)', padding: '10px', marginBottom: '10px', border: 'none', borderRadius: '10px' }}>
                                        <h2>
                                            <Star24Filled style={{ color: "f3ce13" }} /> {review.rating} / 10</h2>
                                        <p>{review.comment}</p>
                                        <p>By {review.user ? review.user.email : null}</p>
                                    </div>
                                    )
                                    })}
                            </div>
                        );
                    }
                    


