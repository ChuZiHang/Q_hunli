const app = getApp()
var apiHost = require('../../utils/APIHosts.js')
var apiUrls = require('../../utils/APIURLs.js')
var fetch = require('../../utils/Fetch.js')
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
    brideName: '',
    brideMobile: '',
    bridegroomMobile: '',
    bridegroomName: '',
    lon: 0,
    lat: 0,
    markers: [{
      iconPath: "/images/nav.png",
      id: 0,
      latitude: 38.015866, // 页面初始化 options为页面跳转所带来的参数 
      longitude: 114.04504,
      width: 50,
      height: 50
    }]
  },
  markertap(e) {
    // console.log(e)
    
    wx.openLocation({
      latitude: parseFloat(38.015866),
      longitude: parseFloat(114.04504),
      scale: 18,
      name: '石桥头',
      address: '石桥头'
    })
      
  },

  // 获取婚礼详情
  indexGetWedding: function () {
    var appId = 1
    fetch.requestFetchGet(apiHost.hostRoot(), apiUrls.getWedding(appId), {
    }).then(response => {
      console.log('婚礼地图', response)
      this.setData({
        brideName: response.data.brideName,
        bridegroomName: response.data.bridegroomName,
        brideMobile: response.data.brideMobile,
        bridegroomMobile: response.data.bridegroomMobile,
        lon: response.data.lon,
        lat: response.data.lat,
      })
    }).catch(error => {
      console.log(error)
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
    that.indexGetWedding()    
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