// pages/person/index.js
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var person = wx.getStorageSync('data')
    if (person != "") {
      this.setData({
        personInfo: person
      })
    }
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
  startFace() {
    wx.showLoading({
      title: '识别',
    })
    wx.startFacialRecognitionVerify({
      // name: that.data.personInfo.personInfo,
      // idCardNumber: that.data.personInfo.idCard,
      checkAliveType: 2,
      name: '陆世杰',
      idCardNumber: '522423199407163612',
      success: (res) => {
        console.log(res)
        var data = {
          scene: 2,
          remark: 'ok',
          state: 1
        }
        // 更新场景状态
        utils.requestPromise('wx/scene/save', data, 'POST').then(res => {
          if (res.data.code == 0) {
            wx.showToast({
              title: '人脸认证通过!',
              icon: 'none',
              success: () => {
                wx.navigateTo({
                  url: '../loanlist/index',
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
  }
})