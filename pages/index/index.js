// pages/invitation/index.js
const app = getApp()
var apiHost = require('../../utils/APIHosts.js')
var apiUrls = require('../../utils/APIURLs.js')
var fetch = require('../../utils/Fetch.js')
var appid = app.globalData.appid;
var touchDot = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    userInfo: {},
    music_url: '',
    isPlayingMusic: true
  },

  // 获取婚礼详情
  indexGetWedding: function (){
    var appId = 1
    fetch.requestFetchGet(apiHost.hostRoot(), apiUrls.getWedding(appId), {
    }).then(response => {
      console.log('婚礼详情', response)
      this.setData({
        music_url: response.data.bgm,
        signImg: response.data.signImg,
        brideName: response.data.brideName,
        bridegroomName: response.data.bridegroomName,
        weddingDate: response.data.weddingDate,
        weddingLunar: response.data.weddingLunar,
        address: response.data.address
      })
      wx.setStorage({
        key: "brideName",
        data: response.data.brideName
      })
      wx.setStorage({
        key: "bridegroomName",
        data: response.data.bridegroomName
      })
      wx.setStorage({
        key: "brideMobile",
        data: response.data.brideMobile
      })
      wx.setStorage({
        key: "bridegroomMobile",
        data: response.data.bridegroomMobile
      })
      
      wx.setStorage({
        key: "imgs",
        data: response.data.imgs
      })
      wx.setStorage({
        key: "lon",
        data: response.data.lon
      })
      wx.setStorage({
        key: "lat",
        data: response.data.lat
      })
      wx.playBackgroundAudio({
        dataUrl: response.data.bgm,
        title: '',
        coverImgUrl: ''
      })
      
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indexGetWedding()
    //创建动画
    var animation = wx.createAnimation({

      duration: 3600,
      timingFunction: "ease",
      delay: 600,
      transformOrigin: "50% 50%",

    })


    animation.scale(0.9).translate(10, 10).step();     //边旋转边放大


    //导出动画数据传递给组件的animation属性。
    this.setData({
      animationData: animation.export(),
    })


    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })

    // wx.request({
    //   url: server,
    //   method: 'GET',
    //   data: { 'c': 'info', 'appid': appid },
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function (res) {
    //     //console.log(res.data)

    //     wx.playBackgroundAudio({
    //       dataUrl: res.data.music_url,
    //       title: '',
    //       coverImgUrl: ''
    //     })


    //     that.setData({
    //       mainInfo: res.data.mainInfo,
    //       music_url: res.data.music_url
    //     });
    //   }
    // })
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
      phoneNumber: this.data.mainInfo.he_tel
    })
  },
  callshe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel
    })
  },
  play: function (event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: ''
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
})