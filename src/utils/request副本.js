import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
// axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   timeout: 5000 // request timeout
// })
const baseURL = process.env.VUE_APP_BASE_API // url = base url + request url
const timeout = 5000 // request timeout

axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    Message({
      message: error || 'Error',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

export default {
  post(url, data, header) {
    const headers = header || {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    return axios({
      method: 'post',
      baseURL,
      url,
      data,
      timeout,
      headers
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  get(url, params, header) {
    const headers = header || {
      'X-Requested-With': 'XMLHttpRequest'
    }
    return axios({
      method: 'get',
      baseURL,
      url,
      params,
      timeout,
      headers
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  delete(url, params, header) {
    const headers = header || {}
    return axios({
      method: 'delete',
      baseURL,
      url,
      params,
      timeout,
      headers
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  put(url, data, header) {
    const headers = header || {}
    return axios({
      method: 'put',
      baseURL,
      url,
      data,
      timeout,
      headers
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  }
}

// 如果http状态码正常，则直接返回数据
function checkStatus(response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }

  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

// 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
function checkCode(res) {
  // 返回数据
  if (res.data && res.status === 20000) {
    return res.data
  } else {
    Message({
      message: res || 'Error',
      type: 'error'
    })
    return res
  }
}
