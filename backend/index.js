require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(cors())

//Models
const User = require('./models/User')

//Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'chegou' })
})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({msg: "Acesso negado"})
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(400).json({ msg: "Token Invalido!"})
    }

}

//Private Route 
app.get('/users/:id', checkToken, async (req, res) => {
    const id = req.params.id
    
    const user = await User.findById(id, '-password')

    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }

    res.status(200).json({user})
})


//Registro de usuário
app.post('/auth/register', async(req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if(!name) {
        return res.status(400).json({error: "Nome vazio"})
    }
    
    if(!email) {
        return res.status(400).json({error: "Email vazio"})
    }
    
    if(!password) {
        return res.status(400).json({error: "Email vazio"})
    }

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem' });
    }
    // Criar um novo usuário
    const userExists = await User.findOne({email: email})
    
    if(userExists){
        return res.status(400).json({error: "Tente com outro e-mail"})
    }
    
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await newUser.save();
        res.status(201).json({ msg: 'Usuário registrado com sucesso' });
        
    } catch (error) {
        res.status(500).json({msg: "Internal server error"})
    }

})

//login do usuário
app.post('/auth/login', async (req, res) => {
    const {email, password} = req.body
    console.log ('chega aqui')
    if(!email) {
        return res.status(400).json({error: "Email vazio"})
    }

    if(!password) {
        return res.status(400).json({error: "Senha vazia"})
    }

    const user = await User.findOne({email: email})
    
    //usuário existe?
    if(!user){
        return res.status(400).json({error: "Usuário não encontrado"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(400).json({error: "Senha invalida"})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id,
        },
        secret
        )
        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token})
    } catch (error) {
        res.status(500).json({msg: "Internal server error"})
    }

})

//Credenciais
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.spki4nd.mongodb.net/`

mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(4567)
        console.log('banco on')

    })
    .catch((e) => console.log(e) )
