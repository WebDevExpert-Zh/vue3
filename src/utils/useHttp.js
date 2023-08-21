import axios from "axios";
import { getToken, removeToken, removeTokenExpire } from "./storage";
import qs from 'qs'
const baseUrl = '/api'
const axios = axios.create({
  baseUrl,
  withCredentials: false,// 跨域情况下不发送cookie
  timeout: 4000
})
// 请求拦截器
axios.interceptors.request.use(
  res => {
    // 根据后端情况选择修改
    res.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (getToken()) {
      // 请求头携带token
      res.headers['Authorization'] = 'Bearer ' + getToken()
    }
    if (res.method == 'get') {
      // 如果是get请求中params参数是数组类型，则转换成 键值对 格式 key=value&key=value 实际跟据后端需要的类型
      res.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  res => {
    const data = res.data
    if (data.code && data.code !== 200) {
      return Promise.reject(res)
    } else {
      return data
    }
  },
  error => {
    // 请求超时
    if (error.code === '408' && error.message.includes('timeout')) {
      return Promise.reject(error)
    }
    // 未登录 或者token过期
    if (data.code === '401') {
      removeToken()
      removeTokenExpire()
      return Promise.reject(error)
    } else if (error.response && error.response.status === 403) {
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

const request = (method, url, data = {}) => {
  return axios({
    method,
    url,
    params: method == 'GET' ? data : {},
    data: method == 'POST' ? data : {}
  })
}
export const GET = (url, data = {}) => request('GET', url, data);
export const POST = (url, data = {}) => request('POST', url, data);

