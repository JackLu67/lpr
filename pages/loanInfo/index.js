// pages/loanInfo/index.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: 0,
        name: '固定利率'
      },
      {
        id: 1,
        name: '浮动利率'
      }
    ],
    item: '固定利率',
    index: 0,
    itemInfo: null,
    flag: true,
    checked: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var item = wx.getStorageSync('loanItem')
    this.setData({
      itemInfo: item
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
  checkboxChange(e) {
    var that = this
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
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      item: this.data.lists[e.detail.value].name
    })
  },
  openPage() {
    // wx.navigateTo({
    //   url: '../agreement/index',
    // })
    var that = this
    var data = {
      fileType: that.data.item,
      uuid: that.data.itemInfo.uuid
    }
    utils.requestPromise('/wx/api/sign/create/file', data, 'POST').then((res) => {
      var data = {
        content: res.data.msg
      }
      wx.downloadFile({
        header: {
          'third_session': utils.getToken()
        },
        url: 'http://soft.anyihexin.com:20000/hn_lpr/wx/api/sign/file/show?content=' + data.content,
        success: function (res) {
          const filePath = res.tempFilePath
          console.log(filePath)
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
  next() {
    var that = this
    if(that.data.checked == 0){
      wx.showToast({
        title: '请先勾选同意所有条款',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: '../verification/index',
    })
  },
})