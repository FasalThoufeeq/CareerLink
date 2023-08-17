import axios from 'axios'

const MyAxios= axios.create({
    baseURL:'https://careerlink.cloud/api/auth'
})
export default MyAxios