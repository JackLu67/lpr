// pages/authentication/index.js
const utils = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btn1Text: '拍照',
    btn2Text: '拍照',
    camera: false,
    show: false,
    src: '',
    positiveImg: '../../static/images/zhengmian.png',
    ReverseImg: '../../static/images/beimian.png',
    positiveImgFlag: false,
    reverseImgFlag: false,
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
      quality: 'low',
      success: (res) => {
        console.log(res)
        that.setData({
          show: true,
          src: res.tempImagePath
        })
      }
    })
  },
  saveImg() {
    var that = this
    if (that.data.isPositive) {
      that.urlToBase64(that.data.src).then(res => {
        wx.showToast({
          title: '上传成功',
          icon: 'none',
          success: ()=> {
            that.setData({
              camera: false,
              btn1Text: '重新上传',
              positiveImg: 'data:image/jpeg;base64,' + res.data,
              positiveImgFlag: true
            })
          }
        })
      })
    } else {
      that.urlToBase64(that.data.src).then(res => {
        console.log(res)
        wx.showToast({
          title: '上传成功',
          icon: 'none',
          success: () => {
            that.setData({
              camera: false,
              btn2Text: '重新上传',
              ReverseImg: 'data:image/jpeg;base64,' + res.data,
              reverseImgFlag: true
            })
          }
        })
        
      })
    }

  },
  cancelBtn() {
    this.setData({
      show: false
    })
  },
  next() {
    var that = this
    if (that.data.positiveImgFlag && that.data.reverseImgFlag) {
      var data = {}
      data.frontBase64 = that.data.positiveImg
      data.backBase64 = that.data.ReverseImg
      // OCR 识别
      utils.requestPromise('wx/api/ocr', data, 'POST').then(res => {
        if (res.data.code == 0) {
          var obj = res.data.data
          obj.idCardFrontUrl = that.data.positiveImg
          obj.idCardReverseUrl = that.data.ReverseImg
          wx.setStorageSync('data', res.data.data)
          wx.showToast({
            title: 'OCR识别成功',
            icon: 'none',
            duration: 2000,
            success: res=> {
              wx.navigateTo({
                url: '../person/index',
              })
            }
          })
        } else {
          wx.showToast({
            title: '身份证OCR识别失败,请重试!',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先上传身份证照片',
        icon: 'none',
        duration: 2000
      })
    }
  },
  urlToBase64(img) {
    wx.showLoading({
      title: '上传中',
    })
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({ // 转成base64位
        filePath: img,
        encoding: 'base64',
        success: data => {
          resolve(data)
        }
      })
    })
  }
})