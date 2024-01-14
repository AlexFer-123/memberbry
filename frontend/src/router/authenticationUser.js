import http from '@/services/http'
import { jwtDecode } from "jwt-decode";

const getUser = async (token) => {
    let user = null

    if(token) {
        console.log(token)
        const userId = jwtDecode(token)
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
          
        const userInfos = await http.get(`/users/${userId.id}`, config)
        user = userInfos
    }
    return user
}

export default getUser()