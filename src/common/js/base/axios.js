import axios from 'axios'
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
axios.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})
export default axios
