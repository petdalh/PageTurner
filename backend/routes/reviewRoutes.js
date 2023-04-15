const express = require('express')
const Review = require('../models/Review')
const {
  createReview,
  getAllReviewByBook,
  getAllReviews,
  deleteReview
} = require('../controllers/reviewController')

const router = express.Router()

// POST a new Review
router.post('/', createReview) 

// GET all reviews that are related to a spesific book. 
router.get('/:id', getAllReviewByBook)

// GET all reviews
router.get('/', getAllReviews)

// DELETE review by id
//NOTE: this also updates the book's ratingSum and ratingCount :)
router.delete('/:id', deleteReview)






module.exports = router