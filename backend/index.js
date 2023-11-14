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
    const { name,  surname, email, password, confirmPassword, imgProfile, imgBanner } = req.body

    if(!name) {
        return res.status(400).json({error: "Nome vazio"})
    }

    if(!surname) {
        return res.status(400).json({error: "Sobrenome vazio"})
    }
    
    if(!email) {
        return res.status(400).json({error: "Email vazio"})
    }
    
    if(!password) {
        return res.status(400).json({error: "Senha vazia"})
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    const userExists = await User.findOne({email: email})
    
    if(userExists){
        return res.status(400).json({error: "Tente com outro e-mail"})
    }
    
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
        name,
        surname,
        email,
        password: passwordHash,
        created: new Date().getTime(),
        profile_image: imgProfile,
        banner_image: imgBanner
    });

    try {
        await newUser.save();
        res.status(201).json({ msg: 'Usuário registrado com sucesso' });
        
    } catch (error) {
        res.status(500).json({msg: "Internal server error"})
    }

})

app.put('/users/:id/token', checkToken, async (req,res) => {

    const { integrationName, tokenIntegration } = req.body 

    if(!integrationName) {
        return res.status(400).json({msg: "Sem nome da integração"})
    }

    if(!tokenIntegration) {
        return res.status(401).json({msg: "Sem chave de acesso para o token"})
    }

    const id = req.params.id
    
    try {

        const user = await User.findById(id, '-password')

        user.integrations.push({name: integrationName, token: tokenIntegration})

        await user.save()

        return res.status(200).json({msg: 'Usuário atualizado'})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

app.post('/auth/login', async (req, res) => {
    const {email, password} = req.body

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
    console.log(checkPassword)

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
