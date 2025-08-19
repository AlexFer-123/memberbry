require('dotenv').config()
const axios = require("axios")
const querystring = require("querystring")

class PandaService {
    constructor() {
        this.baseUrl = "https://auth.pandavideo.com.br"
        this.clientId = process.env.CLIENT_ID_PANDA
        this.clientSecret = process.env.CLIENT_SECRET_PANDA
        this.redirectUri = "https://membry.netlify.app/configs"
    }

    async getOAuth2Token(authCode) {
        try {
            const query = querystring.stringify({
                grant_type: "authorization_code",
                code: authCode,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri,
            })

            const response = await axios.post(
                `${this.baseUrl}/oauth2/token`,
                decodeURIComponent(query),
                {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                }
            )

            const { refresh_token, access_token } = response.data
            return { refresh_token, access_token }
        } catch (error) {
            console.error('Panda API Error:', error)
            throw new Error('Failed to get OAuth2 token from Panda API')
        }
    }
}

module.exports = new PandaService()
