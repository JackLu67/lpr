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
    cameraText: '拍摄正面照',
    latitude: null,
    longitude: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getLocation().then(res => {
      console.log(res, '定位成功')
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
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
          wx.setStorageSync('data', res.data.data)
          var data = res.data.data
          data.latitude = that.data.latitude
          data.longitude = that.data.longitude
          // 发送识别身份数据
          utils.requestPromise('wx/user/ocr/save', data, 'POST').then(res => {
            if (res.data.code == 0) {
              var data = {
                scene: 1,
                remark: 'ok',
                state: 1
              }
              // 更新场景状态
              utils.requestPromise('wx/scene/save', data, 'POST').then(res => {
                if (res.data.code == 0) {
                  wx.showToast({
                    title: '身份证认证成功!',
                    icon: 'none',
                    success: () => {
                      wx.navigateTo({
                        url: '../person/index',
                      })
                    }
                  })
                }
              })
            }
          })
          
        } else {
          wx.showToast({
            title: '身份证OCR识别失败,请重试!',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先上传身份证照片',
        icon: 'none'
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
  },
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          resolve(res)
        }
       })
    })
  }
})