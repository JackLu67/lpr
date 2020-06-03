//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
const Bmap = require('../../static/js/bmap.js')
Page({
  data: {
    checked: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    html: '<div class="main-title">中国人民银行公告〔2019〕第30号为深化利率市场化改革，进一步推动贷款市场报价利率（LPR）运用，现就存量浮动利率贷款的定价基准转换为LPR有关事宜公告如下：</div><div class="sub-title"> 一、本公告所称存量浮动利率贷款，是指2020年1月1日前金融机构已发放的和已签订合同但未发放的参考贷款基准利率定价的浮动利率贷款（不包括公积金个人住房贷款）。自2020年1月1日起，各金融机构不得签订参考贷款基准利率定价的浮动利率贷款合同。</div><div class="sub-title">二、自2020年3月1日起，金融机构应与存量浮动利率贷款客户就定价基准转换条款进行协商，将原合同约定的利率定价方式转换为以LPR为定价基准加点形成（加点可为负值），加点数值在合同剩余期限内固定不变；也可转换为固定利率。定价基准只能转换一次，转换之后不能再次转换。已处于最后一个重定价周期的存量浮动利率贷款可不转换。存量浮动利率贷款定价基准转换原则上应于2020年8月31日前完成。</div><div class="sub-title">三、存量浮动利率贷款定价基准转换为LPR，除商业性个人住房贷款外，加点数值由借贷双方协商确定。商业性个人住房贷款的加点数值应等于原合同最近的执行利率水平与2019年12月发布的相应期限LPR的差值。从转换时点至此后的第一个重定价日（不含），执行的利率水平应等于原合同最近的执行利率水平，即2019年12月相应期限LPR与该加点数值之和。之后，自第一个重定价日起，在每个利率重定价日，利率水平由最近一个月相应期限LPR与该加点数值重新计算确定。</div><div class="sub-title">四、金融机构与客户协商定价基准转换条款时，可重新约定重定价周期和重定价日，其中商业性个人住房贷款重新约定的重定价周期最短为一年。</div><div class="sub-title">五、如存量浮动利率贷款转换为固定利率，转换后的利率水平由借贷双方协商确定，其中商业性个人住房贷款转换后利率水平应等于原合同最近的执行利率水平。</div><div class="sub-title">六、金融机构应利用官方网站和网点公告、电话、短信、邮件和手机银行等渠道通知存量浮动利率贷款客户，协商约定定价基准转换具体事项，依法合规保障借款人合同权利和费者权益。</div><div class="sub-title">七、中国人民银行分支机构应加强对地方法人金融机构的指导，确保地方法人金融机构按照统一部署，妥善做好存量浮动利率贷款定价基准转换工作。</div>'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // var BMap = new Bmap.BMapWX({ 
    //   ak: 'MLJBZ-B4AKK-YDPJP-ATJZY-VKXQ2-Q7BTU' 
    // }); 
    // console.log(Bmap)
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
    wx.checkSession({
      success: function (res) {
        console.log("处于登录装态");
        that.getStatus()
        wx.navigateTo({
          url: '../verification/index',
        })
      },
      fail: function (res) {
        console.log("需要重新登录");
      }
    })
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

  bindGetUserInfo(e) {
    var that = this
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    if (that.data.checked == '1') {
      that.login(e.detail.userInfo)
    } else {
      wx.showToast({
        title: '请勾选同意以上协议',
        icon: 'none',
        duration: 2000,
      })
    }
  },
  checkboxChange(e) {
    console.log(e.detail.value)
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
  login(data) {
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        var obj = {}
        obj.code = res.code
        obj.userAvatarUrl = data.avatarUrl
        obj.userCity = data.city
        obj.userCountry = data.country
        obj.userGender = data.gender
        obj.userLanguage = data.language
        obj.userNickName = '测试'
        obj.userProvince = data.province
        utils.requestPromise('wx/login', obj, 'POST', '登录中')
          .then(res => {
            wx.setStorageSync('token', res.header.third_session)
            that.openView(res.data.scene)
          })
      }
    })
  },
  getNotice() {
    var that = this
    utils.requestPromise('/wx/resource/notice').then(res => {
      console.log(res)
      that.setData({
        html: res.data.msg
      })
    })
  },
  getStatus() {
    var that = this
    utils.requestPromise('wx/scene/latest', '1').then(res => {
      if (res.data.code == 0) {
        var scene = res.data.data.scene
        that.openView(scene)
      }
    })
  },
  openView(scene) {
    if (scene == '1') {
      wx.navigateTo({
        url: '../authentication/index',
      })
    } else if(scene == '2') {
      wx.navigateTo({
        url: '../person/index',
      })
    }else {
      wx.navigateTo({
        url: '../loanlist/index',
      })
    }
  }
})