import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthController {
    async register(req, res) {
        try {
            const { name, surname, email, password, confirmPassword, imgProfile, imgBanner } = req.body

            // Validations
            if (!name) {
                return res.status(400).json({ error: "Nome é obrigatório" })
            }

            if (!surname) {
                return res.status(400).json({ error: "Sobrenome é obrigatório" })
            }

            if (!email) {
                return res.status(400).json({ error: "Email é obrigatório" })
            }

            if (!password) {
                return res.status(400).json({ error: "Senha é obrigatória" })
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'As senhas não coincidem' })
            }

            // Check if user already exists
            const userExists = await User.findOne({ email: email })

            if (userExists) {
                return res.status(400).json({ error: "Usuário já existe com este e-mail" })
            }

            // Hash password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            // Create new user
            const newUser = new User({
                name,
                surname,
                email,
                password: passwordHash,
                created: new Date().getTime(),
                profile_image: imgProfile,
                banner_image: imgBanner
            })

            await newUser.save()
            
            res.status(201).json({ 
                msg: 'Usuário registrado com sucesso',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    surname: newUser.surname,
                    email: newUser.email
                }
            })

        } catch (error) {
            console.error('Register error:', error)
            res.status(500).json({ msg: "Erro interno do servidor" })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            // Validations
            if (!email) {
                return res.status(400).json({ error: "Email é obrigatório" })
            }

            if (!password) {
                return res.status(400).json({ error: "Senha é obrigatória" })
            }

            // Check if user exists
            const user = await User.findOne({ email: email })

            if (!user) {
                return res.status(400).json({ error: "Usuário não encontrado" })
            }

            // Check password
            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
                return res.status(400).json({ error: "Senha inválida" })
            }

            // Generate JWT token
            const secret = process.env.SECRET
            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '24h' })

            res.status(200).json({ 
                msg: 'Autenticação realizada com sucesso', 
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email
                }
            })

        } catch (error) {
            console.error('Login error:', error)
            res.status(500).json({ msg: "Erro interno do servidor" })
        }
    }
}

export default new AuthController();
