const app = getApp()
var appid = app.globalData.appid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    mainInfo:{
      he_tel:''
    },
    brideName: wx.getStorageSync('brideName'),
    brideMobile: wx.getStorageSync('brideMobile'),
    bridegroomMobile: wx.getStorageSync('bridegroomMobile'),
    bridegroomName: wx.getStorageSync('bridegroomName'),
    lon: wx.getStorageSync('lon'),
    lat: wx.getStorageSync('lat'),
    markers: [{
      iconPath: "/images/nav.png",
      id: 0,
      latitude: wx.getStorageSync('lat'), // 页面初始化 options为页面跳转所带来的参数 
      longitude: wx.getStorageSync('lon'),
      width: 50,
      height: 50
    }]
  },
  markertap(e) {
    // console.log(e)
    
    wx.openLocation({
      latitude: parseFloat(wx.getStorageSync('lat')),
      longitude: parseFloat(wx.getStorageSync('lon')),
      scale: 18,
      name: '石桥头',
      address: '石桥头'
    })
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
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
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  callhe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.bridegroomMobile
    })
  },
  callshe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.brideMobile
    })
  }
})