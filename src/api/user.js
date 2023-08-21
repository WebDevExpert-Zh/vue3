/**
 * debounce 防抖
 * @param func 处理防抖的方法
 * @param time 等待的时间
 * @param {leading,trailing} 均为布尔值 第一个表示等待时间开始时立即执行函数 第二个表示是否在等待结束后继续执行函数
 * 
 * throttle 节流
 * @param func 处理节流的方法
 * @param time 等待的时间
 * @param {leading,trailing} 均为布尔值 第一个表示等待时间开始时立即执行函数 第二个表示是否在等待结束后继续执行函数
 */
import { POST } from '@/utils/useHttp'
import { debounce, throttle } from 'lodash'

const api = {
  login: '', // 登录
  // ...
}

/**
 * 登录
 * @param option 邮箱 or 手机号
 * @returns {Promise<boolean>} 返回登录结果，成功为 true，失败为 false
 */
export const login = throttle((option) => {
  return POST(api.login, option)
}, 3000, { trailing: false })