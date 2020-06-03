const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * requestPromise用于将wx.request改写成Promise方式
 * @param：{string} myUrl 接口地址
 * @return: Promise实例对象
 */
const app = getApp()
const requestPromise = (myUrl, data, method, loadinText) => {
  loadinText = loadinText == undefined ? '加载中' : loadinText
  wx.showLoading({title: loadinText, mask: true})
  // 返回一个Promise实例对象
  // var baseUrl = 'http://10.126.8.106:12801/hn_lpr/'
  var baseUrl = 'http://soft.anyihexin.com:20000/hn_lpr/'
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + myUrl,
      method: method == undefined ? 'GET' : method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'third_session': getToken()
      },
      data: data == undefined ? null : data,
      success: res => {
        if (res.data.code == 500 || res.data.code == 301) {
          if (data == '1') {
            return
          }
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return
        }
        resolve(res)
      },
      complete: res => {
        setTimeout(() => {
          wx.hideLoading()
        }, 2000)
      }
    })
  })
}
const getToken = () => {
  return wx.getStorageSync('token')
}
module.exports = {
  formatTime: formatTime,
  requestPromise: requestPromise,
  getToken: getToken
}
