// pages/person/index.js
const app = getApp()
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: {
      name: '',
      sex: '',
      idCard: '',
      expiryDate: '',
      koseki: ''
    },
    latitude: null,
    longitude: null,
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var person = wx.getStorageSync('data')
    if (person != "") {
      this.setData({
        personInfo: person
      })
    }
    utils.getLocation().then(res => {
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submit() {
    var that = this
    var data = that.data.personInfo
    data.latitude = app.globalData.latitude
    data.longitude = app.globalData.longitude
    data.location = app.globalData.address
    // 发送识别身份数据
    utils.requestPromise('wx/user/ocr/save', data, 'POST').then(res => {
      if (res.data.code == 0) {
        var data = {
          scene: 1,
          remark: 'ok',
          state: 1
        }
        // 更新场景状态
        utils.requestPromise('wx/scene/save', data, 'POST').then(res => {
          if (res.data.code == 0) {
            wx.showToast({
              title: '身份证认证成功!',
              icon: 'none',
              success: () => {
                wx.navigateTo({
                  url: '../face/index',
                })
              }
            })
          }
        })
      }
    })
  }
})