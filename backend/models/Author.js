const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema(
  {
    name: { //Name can perhaps be split in firstName and lastName
      type: String,
      required: true
    },
    birthYear: { //One could later include month and date. 
      type: Number,
      required: false
    },
    books: [{
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: false // This should be true, but I'm not sure how to handle it right now
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Author', authorSchema)