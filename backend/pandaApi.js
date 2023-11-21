require('dotenv').config()

const axios = require("axios")
const querystring = require("querystring");
const url = "https://auth.pandavideo.com.br"

const tokenOAuth2 = async (token) => { 
    console.log(token)
    const code = token; // this you'll find in the step-1.html archive.
    const client_id = process.env.CLIENT_ID_PANDA ;
    const client_secret = process.env.CLIENT_SECRET_PANDA;
    const redirect_uri = "https://membry.netlify.app/configs";

       const query = querystring.stringify({
           grant_type: "authorization_code",
           code: code,
           client_id: client_id,
           client_secret: client_secret,
           redirect_uri: redirect_uri,
       })
   
       console.log(query)
       const response = await axios.post(
           `${url}/oauth2/token`,
           decodeURIComponent(query),
           {
               headers: {
                   "content-type": "application/x-www-form-urlencoded",
               },
       })
       
       const refresh_token = response.data.refresh_token; 
       const tokenAcess = response.data.access_token;

       return {refresh_token, tokenAcess}
    
}

module.exports = {
    tokenOAuth2,
}
