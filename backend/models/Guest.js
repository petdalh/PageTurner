const mongoose = require('mongoose');


const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['guest'],
        default: 'guest'
    }
});

const Guest = mongoose.model('Guest', guestSchema);
