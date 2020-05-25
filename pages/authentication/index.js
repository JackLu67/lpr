// pages/authentication/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn1Text: '拍照',
    btn2Text: '拍照',
    camera: false,
    show: false,
    src: '../../static/images/pageBgn.png',
    positiveImg: '../../static/images/zhengmian.png',
    ReverseImg: '../../static/images/beimian.png',
    isPositive: true, // 判断是否是正面
    cameraText: '拍摄正面照'
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
  openCamera(e) {
    var n = e.currentTarget.dataset.index
    var that = this
    if (n == '1') {
      that.setData({
        camera: true,
        show: false,
        isPositive: true,
        cameraText: '拍摄正面照'
      })
    } else {
      that.setData({
        camera: true,
        show: false,
        isPositive: false,
        cameraText: '拍摄反面照'
      })
    }
  },
  takePhoto(e) {
    var that = this
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        /*wx.getFileSystemManager().readFile({ // 转成base64位
          filePath: res.tempImagePath,
          encoding: 'base64',
          success: function(data) {
            console.log(data)
          }
        })*/
        that.setData({
          show: true,
          src: res.tempImagePath
        })
      }
    })
  },
  saveImg () {
    var that = this
    // wx.showModal({
    //   title: '图片地址',
    //   content: that.data.src,
    // })
    if (that.data.isPositive) {
      that.setData({
        camera: false,
        btn1Text: '重新上传',
        positiveImg: that.data.src
      })
    } else {
      that.setData({
        camera: false,
        btn2Text: '重新上传',
        ReverseImg: that.data.src
      })
    }
    
  },
  cancelBtn () {
    this.setData({show: false})
  },
  next() {
    wx.navigateTo({
      url: '../person/index',
    })
  }
})