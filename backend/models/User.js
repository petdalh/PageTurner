const mongoose = require('mongoose')
//const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        userCreatedBooks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: false
        }],
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        // reviews: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Review',
        //     required: false
        // }],
        // favorites: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Book',
        //     required: false
        // }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)