
# Backend

### Para rodar precisa:

*Backend de autenticação de login e integração com a API da Panda.*

-----------
1. Instalar as dependências do projeto
``` 
npm install
```
Dependências usadas:

* **Express:** Rodar o servidor e gerar a porta de escuta, rotas da API
* **Moongose:** Integrar o Banco de dados
* **bcrypt:** Fazer a criptografia da senha
* **Axios:** Para fazer a integração das rotas das API's
* **Nodemon:** Recarregar o servidor após atualizações
* **jsonwebtoken(JWT):** Usado como middleware do token de verificação do login
* **dotenv:** para integrar o `.env` e fazer a chamada dos valores sensíveis. 

2. Integrar com o mongoDB, fornecendo os env's de acesso ao banco e o SECRET para a geração dos tokens de autenticação.