const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    surname: String,
    email: String,
    password: String,
    company: String,
    integrations: [],
    created: Number
})

module.exports = User