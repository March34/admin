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

// ??????http???????????????????????????????????????
function checkStatus(response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // ?????????????????????data?????????????????????????????? return response.data
  }

  // ??????????????????????????????????????????
  return {
    status: -404,
    msg: '????????????'
  }
}

// ??????code??????(????????????????????????????????????????????????????????????????????????)????????????????????????????????????????????????
function checkCode(res) {
  // ????????????
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
