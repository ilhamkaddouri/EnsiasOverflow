import axios from 'axios'
export const login = ({email,passwprd})=>{
    try{
        const res = await axios.post('api/user/login')
    }catch(err){

    }
}