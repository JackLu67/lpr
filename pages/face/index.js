// pages/face/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  startFace() {
    var that = this
    wx.showLoading({
      title: '识别中',
    })

    wx.startFacialRecognitionVerify({
      // name: that.data.personInfo.personInfo,
      // idCardNumber: that.data.personInfo.idCard,
      checkAliveType: 1,
      name: '陆世杰',
      idCardNumber: '522423199407163612',
      success: (res) => {
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