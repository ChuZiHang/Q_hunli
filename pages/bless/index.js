// pages/bless/index.js

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
    zanLog: [],
    openId: ''
  },
  // 请求赞列表
  getBless: function () {
    var appId = 1
    fetch.requestFetchGet(apiHost.hostRoot(), apiUrls.getBless(appId), {
    }).then(response => {
      console.log(response)
      this.setData({
        zanLog: response.data
      });
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

    this.getBless()
    
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
  zan: function (event) {
    fetch.requestFetchPost(apiHost.hostRoot(), apiUrls.postBless() , {
      'appId': 1,
      'openId': wx.getStorageSync('openId')
    }).then(response => {
      console.log(response)
      if (response.statusCode == 200){
        wx.showToast({
          title: '点赞成功',
          icon: 'none',
          duration: 2000
        })
        this.getBless()
      }else{
        wx.showToast({
          title: response.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
})