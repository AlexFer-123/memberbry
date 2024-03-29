const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    surname: String,
    email: String,
    password: String,
    company: String,
    integrations: Array,
    lessons: Array,
    created: Number
})

module.exports = User