// pages/verification/index.js
const app = getApp()
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeTetx: '获取验证码',
    i: 60,
    n: 1,
    flag: true,
    context: null,
    phoneNum: null,
    code: null,
    type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    this.setData({
      type: type
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
    var that = this
    var context = wx.createCanvasContext('myCanvas')
    context.setLineWidth(2)
    that.setData({
      context: context
    })
    context.draw()
  },
  // input与data数据双向绑定
  bindInput(e) {
    var that = this
    var item = e.currentTarget.id
    that.setData({
      [item]: e.detail.value
    })
  },
  // 获取验证码
  getCode() {
    // console.log(1)
    var that = this
    if (that.data.phoneNum == null) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    var data = {
      phone: that.data.phoneNum
    }
    utils.requestPromise('/wx/api/sign/sms',data, 'POST').then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '发送成功,请注意查收',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          codeTetx: '已发送，'+that.data.i + 's',
          flag: false
        })
        that.count()
      }
    })
  },
  // 提交
  submit() { 
    var that = this
    var img = null
    if (that.data.phoneNum == null) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return
    } else if (that.data.code == null) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }
    // canvas转图片
    that.data.context.draw(true, wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      fileType: 'png',
      canvasId: 'myCanvas',
      success: res => {
        that.urlToBase64(res.tempFilePath).then(res => {
          img = 'data:image/png;base64,' + res.data
          var item = wx.getStorageSync('loanItem')
          var data = {
            fileType: that.data.type,
            latitude: app.globalData.latitude,
            longitude: app.globalData.longitude,
            signAddr:  app.globalData.address,
            signSeal: img,
            smsCode: that.data.code,
            phoneNum: that.data.phoneNum,
            uuid: item.uuid
          }
          utils.requestPromise('/wx/api/sign/contract', data, 'POST').then(res => {
            if(res.data.code == 0) {
              wx.navigateTo({
                url: '../end/index',
              })
            }
          })
        })
      }
    }))
  },
  // 倒计时60S
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
  },
  // 开始签字，记录坐标
  startTouch(e) {
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y)
  },
  moveTouch(e) {
    this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y)
    this.data.context.stroke()
    this.data.context.draw(true);
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y)
  },
  // 清空画布
  clear() {
    this.data.context.draw()
  },
  urlToBase64(img) {
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