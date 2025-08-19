const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        trim: true
    },
    profile_image: {
        type: String
    },
    banner_image: {
        type: String
    },
    integrations: {
        type: Object,
        default: {}
    },
    lessons: {
        type: Array,
        default: []
    },
    created: {
        type: Number,
        default: Date.now
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User