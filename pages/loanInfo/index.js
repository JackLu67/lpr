// pages/loanInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: 0,
        name: '每年初调整'
      },
      {
        id: 1,
        name: '每年末调整'
      }
    ],
    item: '每年初调整',
    index: 0,
    itemInfo: null,
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var item = wx.getStorageSync('loanItem')
    console.log(item)
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
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      item: this.data.lists[e.detail.value].name
    })
  },
  openPage() {
    wx.navigateTo({
      url: '../agreement/index',
    })
  },
  next() {
    wx.navigateTo({
      url: '../verification/index',
    })
  },
})