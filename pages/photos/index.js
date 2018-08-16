//index.js
//获取应用实例
const app = getApp()
var apiHost = require('../../utils/APIHosts.js')
var apiUrls = require('../../utils/APIURLs.js')
var fetch = require('../../utils/Fetch.js')
var appid = app.globalData.appid;
Page({
  data: {
    userInfo: {},
    imgUrls: []
  },
  // 获取婚礼详情
  indexGetWedding: function () {
    var appId = 1
    fetch.requestFetchGet(apiHost.hostRoot(), apiUrls.getWedding(appId), {
    }).then(response => {
      console.log('婚礼照片', response)
      

      var imgs = response.data.imgs;
      var images = imgs.split(',')

      this.setData({
        imgUrls: images
      })


    }).catch(error => {
      console.log(error)
    })
  },
  onLoad: function () {
    this.indexGetWedding()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function (res) {
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
  }
})
