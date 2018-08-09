import axios from './axios'

// post 请求 表单数据提交
export const fetchPost = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: params,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    }).then((response) => {
      resolve(response.data)
    })
  })
}

// post 请求 json提交
export const fetchPostObj = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: params,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then((response) => {
      resolve(response.data)
    })
  })
}

// get 请求
export const fetchGet = (url, param = {}) => {
  let params = {
    params: param
  }
  return new Promise((resolve, reject) => {
    axios.get(`${url}?t=${new Date().getTime()}`, params).then(res => {
      // 加上时间戳 消除ie版本浏览器的缓存
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
