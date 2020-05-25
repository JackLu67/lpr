//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/util.js')
Page({
  data: {
    checked: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        console.log(code)
        var data = {
          code: res.code
        }
        http.requestPromise('https://tcb-api.tencentcloudapi.com', 'post', data)
          .then(res => {
            console.log(res)
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  bindGetUserInfo (e) {
    var that = this
    if (that.data.checked == '1') {
      console.log(e.detail.userInfo)
      wx.navigateTo({
        url: '../authentication/index'
      })
    } else {
      wx.showToast({
        title: '请勾选同意以上协议',
        icon: 'none',
        duration: 2000,
      })
    }
  },
  checkboxChange(e) {
    console.log(e.detail.value)
    var that = this
    console.log(that.data.checked)
    var checked = e.detail.value[0]
    if (checked == '0') {
      that.setData({
        checked: 1
      })
    } else {
      that.setData({
        checked: 0
      })
    }
  }
})
