// pages/end/index.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileType: null,
    uuid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fileType = options.fileType
    var uuid = options.uuid
    this.setData({
      fileType: fileType,
      uuid: uuid
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
  viewContract() {
    var that = this
    var data = {
      fileType: that.data.fileType,
      uuid: that.data.uuid
    }
    utils.requestPromise('/wx/api/sign/create/file', data, 'POST').then((res) => {
      var data = {
        content: res.data.msg
      }
      wx.downloadFile({
        header: {
          'third_session': utils.getToken()
        },
        url: 'https://www.anyihexin.com/lpr_zjj/wx/api/sign/file/show?content=' + data.content,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: 'pdf',
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    })
  },
  end() {
    wx.navigateTo({
      url: '../loanlist/index',
    })
  }
})