// pages/loanlist/index.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loanList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLoanList()
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
  openPageInfo(e) {
    var that = this
    var uuid = e.currentTarget.dataset.id
    var item = that.data.loanList.find(item => item = uuid)
    wx.setStorageSync('loanItem', item)
    wx.navigateTo({
      url: '../loanInfo/index',
    })
  },
  getLoanList() {
    var that = this
    util.requestPromise('/wx/loan/list').then(res => {
      if (res.data.code == 0) {
        var data = that.normalData(res.data.data)
        that.setData({
          loanList: data
        })
        wx.hideLoading()
      }
    })
  },
  normalData(data) {
    var arr = {
      '00': '待签署',
      1: '主贷人已签署',
      2: '担保人已签署',
      3: '已签署'
    }
    data.map(item => {
      if (item.signState == null) {
        item.signState = 0
      }
      item.signStateName = arr[item.signState]
    })
    return data
  }
})