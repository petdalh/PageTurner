import axios from 'axios'

const baseUrl = "http://localhost:4000/api"

export const getReviews = () => {

    return axios.get(`${baseUrl}/review`)
        .then(response => {
            // Return the reviews data as JSON
            let reviews = response.data
            console.log(reviews)
            return reviews
            //return response.data;
        })
        .catch(error => {
            // Handle any errors
            console.error(error)
        })
}

export const createReview = (book, user, rating, comment) => {
    return axios.post(`${baseUrl}/review`, {
        book: book,
        user: user,
        rating: rating,
        comment: comment,
    })
        .then(response => {
            let newReview = response.data
            console.log("The new review", newReview)
            return newReview
        })
        .catch(error => {
            console.error(error)
        })
}

export const getAllReviewByBook = (id) => {
    return axios.get(`${baseUrl}/review/${id}`)
        .then(response => {
            console.log("DATA", response.data)
            return response.data
        })
        .catch(error => {
            console.error(error)
        })
}