const User = require('../models/User')
const pandaService = require('../services/pandaService')

class UserController {
    async getUser(req, res) {
        try {
            const id = req.params.id
            
            const user = await User.findById(id, '-password')

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado' })
            }

            res.status(200).json({ user })

        } catch (error) {
            console.error('Get user error:', error)
            res.status(500).json({ msg: "Erro interno do servidor" })
        }
    }

    async updateIntegrationToken(req, res) {
        try {
            const { integrationName, tokenIntegration, email } = req.body

            // Validations
            if (!integrationName) {
                return res.status(400).json({ msg: "Nome da integração é obrigatório" })
            }

            if (!tokenIntegration) {
                return res.status(400).json({ msg: "Token de integração é obrigatório" })
            }

            if (!email) {
                return res.status(400).json({ msg: "Email é obrigatório" })
            }

            // Find user
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado' })
            }

            // Get OAuth2 token from Panda API
            const pandaTokens = await pandaService.getOAuth2Token(tokenIntegration)

            // Update user integrations
            user.integrations = { 
                name: integrationName, 
                token: pandaTokens 
            }
            
            await user.save()

            res.status(200).json({ 
                msg: 'Integração atualizada com sucesso', 
                user: await User.findById(user._id, '-password')
            })

        } catch (error) {
            console.error('Update integration token error:', error)
            res.status(500).json({ msg: "Erro interno do servidor" })
        }
    }

    async addLesson(req, res) {
        try {
            const { name, description, video } = req.body
            const userId = req.params.id

            // Validations
            if (!name) {
                return res.status(400).json({ msg: "Nome da aula é obrigatório" })
            }

            if (!video) {
                return res.status(400).json({ msg: "Vídeo é obrigatório" })
            }

            // Find user
            const user = await User.findById(userId)

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado' })
            }

            // Add lesson
            const newLesson = {
                id: Date.now(), // Simple ID generation
                name,
                description: description || '',
                video,
                created: new Date().getTime()
            }

            user.lessons.push(newLesson)
            await user.save()

            res.status(201).json({ 
                msg: "Aula criada com sucesso",
                lesson: newLesson
            })

        } catch (error) {
            console.error('Add lesson error:', error)
            res.status(500).json({ msg: "Erro interno do servidor" })
        }
    }
}

module.exports = new UserController()
