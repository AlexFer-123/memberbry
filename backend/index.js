require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json());

//Models
const User = require('./models/User')

//Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'chegou' })
})

//Registro de usuário
app.post('/auth/register', async(req, res) => {
    const {name, email, password, confirmPassword} = req.body

})

//Credenciais

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
console.log(dbPass)

const dbUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.spki4nd.mongodb.net/`

mongoose
    .connect(dbUrl)
    .then(() => {
        app.listen(4567)
        console.log('banco on')

    })
    .catch((e) => console.log(e) )
