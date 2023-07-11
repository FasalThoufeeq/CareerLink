import axios from 'axios'

const MyAxios= axios.create({
    baseURL:'http://localhost:3000/api/auth'
})
export default MyAxios