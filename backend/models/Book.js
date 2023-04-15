const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: true // This should be true, but I'm not sure how to handle it right now
        },
        releaseYear: {
            type: Number,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        pages: {
            type: Number,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        isbn: {
            type: String, 
            required: true
        },
        ratingSum: {
            type: Number,
            default: 0
            },
        ratingCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Book', bookSchema)