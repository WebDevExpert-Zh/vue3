// token相关管理
const TokenKey = 'token'
const TokenExpireKey = 'token-expire'
// 设置token
export function setToken (val) {
  const value = window.localStorage.setItem(TokenKey, val)
  return value
}
// 获取token
export function getToken () {
  return window.localStorage.getItem(TokenKey)
}
// 设置过期时间
export function setTokenExpire (val) {
  return window.localStorage.setItem(TokenExpireKey, val)
}
// 获取过期时间
export function getTokenExpire () {
  return window.localStorage.getItem(TokenExpireKey)
}
// 移除token(常见于登录过期)
export function removeToken () {
  const value = window.localStorage.removeItem(TokenKey)
  return value
}
// 移除过期时间
export function removeTokenExpire () {
  return window.localStorage.removeItem(TokenExpireKey)
}
// 检查是否过期
export function checkTokenExpireTime () {
  let token = getToken()
  let time = getTokenExpire()
  if (!token || !time) {
    removeToken()
    removeTokenExpire()
    return false
  }

  // 过期
  if (time < Date.now()) {
    removeToken()
    removeTokenExpire()
    return false
  }
  return false
}