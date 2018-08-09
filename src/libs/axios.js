import axios from 'axios'
import qs from 'qs'
import baseURL from '_conf/url'
import router from '../router/index'
import {Message} from 'iview'

axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = baseURL
axios.defaults.responseType = 'json'
// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      config.data = qs.stringify(config.data)
    }
  }
  if (window.localStorage.getItem('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers['asoco-token'] = window.localStorage.getItem('token')
  }
  // console.log(JSON.stringify(config));
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

// code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.data && res.data.code === 1) {
    Message.error(res.data.msg)
    return false
  }
  if (res.data && res.data.code === -1) {
    Message.error(res.data.msg)
    return false
  }
  if (res.data && res.data.code === 9999) {
    if (res.data.msg === '令牌不存在或已经过期') {
      Message.error('登录过期，请重新登录')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userId')
      window.localStorage.removeItem('username')
      setTimeout(function () {
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.name}
        })
      }, 1000)
      return false
    } else {
      Message.error(res.data.msg)
      return false
    }
  }
  return res
}, (error) => {
  console.log('网络异常')

  if (error && error.response) {
    switch (parseInt(error.response.status)) {
      case 401:
        setTimeout(function () {
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.name}
          })
        }, 1000)
        window.localStorage.removeItem('token')
        error.message = '登录过期，请重新登录'
        break
      case 504:
        error.message = '网关超时'
        break
      case 502:
        error.message = '后端接口未开'
        break
      case 403:
        error.message = '当前账号没有操作权限'
        break
    }
  } else {
    error.message = '网关超时'
    return false
  }
  return Promise.reject(error)
})

export default axios
