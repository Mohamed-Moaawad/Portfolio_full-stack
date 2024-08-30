const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const User = mongoose.model('User',UserSchema);

module.exports = User;