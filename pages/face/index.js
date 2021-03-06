// pages/face/index.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    personInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.requestPromise('wx/user/identity', null, 'POST').then(res => {
      var person = {}
      if(res.data.code == 0) {
        person.name = res.data.data.name
        person.idCard = res.data.data.idCard
        this.setData({
          personInfo: person
        })
      }
    })
  },
  startFace() {
    var that = this
    wx.showLoading({
      title: '识别中',
    })

    wx.startFacialRecognitionVerify({
      name: that.data.personInfo.name,
      idCardNumber: that.data.personInfo.idCard,
      checkAliveType: 1,
      success: (res) => {
        var data = {}
        data.verifyResult = res.verifyResult
        utils.requestPromise('/wx/user/face/save', data, 'POST').then(res => {
          if (res.data.code == 0) {
            wx.showToast({
              title: '人脸认证通过!',
              icon: 'none',
              duration: 2000,
              success: () => {
                that.setData({
                  flag: false
                })
              }
            })
          }
        })
        
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  },
  complete() {
    var data = {
      scene: 2,
      remark: 'ok',
      state: 1
    }
    // 更新场景状态
    utils.requestPromise('wx/scene/save', data, 'POST').then(res => {
      if (res.data.code == 0) {
        wx.navigateTo({
          url: '../loanlist/index',
        })
      }
    })
  }
})