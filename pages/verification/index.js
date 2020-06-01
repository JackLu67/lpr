// pages/verification/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeTetx: '获取验证码',
    i: 60,
    n: 1,
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getCode() {
    // console.log(1)
    var that = this
    that.setData({
      codeTetx: '已发送，'+that.data.i + 's',
      flag: false
    })
    that.count()
  },
  end() {
    wx.navigateTo({
      url: '../end/index',
    })
  },
  count() {
    var that = this
    var timer = setInterval(() => {
      var i = that.data.i - 1
      if(i == 0) {
        that.setData({
          i: 60,
          codeTetx: '获取验证码',
          flag: true
        })
        clearInterval(timer)
        return
      }
      that.setData({
        i: i,
        codeTetx: '已发送，'+ i + 's',
      })
    }, 1000)
  }
})