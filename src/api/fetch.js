/*
 * @Descripttion: 自己用的一版请求
 * @Author: perfectyang
 * @Date: 2019-09-05 17:36:12
 * @LastEditors: perfectyang
 * @LastEditTime: 2019-09-06 10:36:54
 */
import axios from 'axios'
import qs from 'qs'
import isObject from 'lodash/isObject'

const fetch = axios.create({
  baseURL: '/',
  // timeout: 20000,
  // withCredentials: true
})
const config = Object.assign({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
fetch.interceptors.request.use(config => {
  // const tokenId = JSON.parse(window.sessionStorage.getItem('user') || '{}').token_id || getQueryString('token_id') || ''
  if (Object.prototype.toString.call(config.data) === '[object FormData]') {
    config.headers['Content-Type'] = 'multipart/form-data'
    // config.data.append('token_id', tokenId)
  } else {
    Object.keys(config.data).forEach(key => {
      if (isObject(config.data[key])) {
        config.data[key] = JSON.stringify(config.data[key])
      }
    })
    // config.data.token_id = tokenId
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
fetch.interceptors.response.use(response => {
  return response
}, (error) => {
  console.log('error', error)
  if (!axios.isCancel(error)) {
     /* eslint-disable no-new */
    return Promise.reject(error)
  } else {
    return new Promise(() => {})
  }
})

const handlResult = (res, callback) => {
  if (/^([-1-9]\d*)$/.test(+res.data.code)) {
     /* eslint-disable no-new */
    callback(null)
  } else {
    callback(res.data)
  }
}

function post (url, params) {
  return new Promise((resolve, reject) => {
    fetch.post(url, params, config).then(response => {
      handlResult(response, resolve)
    }).catch(err => {
      resolve(null, err)
    })
  })
}

export default {
  post
}
