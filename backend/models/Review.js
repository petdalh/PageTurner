const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number, 
      required: true
    },
    comment: {
      type: String, 
      required: false   //Could be changed to true. 
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)