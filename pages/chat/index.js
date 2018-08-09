// pages/chat/index.js

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
    inputValue: '',
    chatList: [],
    chatNum: 1
  },

  // 留言列表
  getUserMessage: function () {
    var appId = 1
    fetch.requestFetchGet(apiHost.hostRoot(), apiUrls.getUserMessage(appId), {
    }).then(response => {
      console.log(response)
      this.setData({
        chatList: response.data
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
    that.getUserMessage()
    
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
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  foo: function () {
    var that = this;
    if (that.data.inputValue) {
      //留言内容不是空值

      var userInfo = that.data.userInfo;
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;
      var words = that.data.inputValue;


      fetch.requestFetchPost(apiHost.hostRoot(), apiUrls.postUserMessage(), {
        'appId': 1,
        'content': words,
        'nickName': name,
        'avatarUrl': face
      }).then(response => {
        console.log(response)
        if (response.statusCode == 200) {
          wx.showToast({
            title: '留言成功',
            icon: 'none',
            duration: 2000
          })
          this.getUserMessage()
        } else {
          wx.showToast({
            title: response.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(error => {
        console.log(error)
      })



      // wx.request({
      //   url: server,
      //   data: { 'c': 'send', 'appid': appid, 'nickname': name, 'face': face, 'words': words },
      //   header: {},
      //   method: "GET",
      //   dataType: "json",
      //   success: res => {
      //     // console.log(res.data);
      //     if (res.data.success) {
      //       that.setData({
      //         chatList: res.data.chatList,
      //         chatNum: res.data.chatNum
      //       });
      //       wx.showModal({
      //         title: '提示',
      //         content: res.data.msg,
      //         showCancel: false
      //       })
      //     } else {
      //       wx.showModal({
      //         title: '提示',
      //         content: res.data.msg,
      //         showCancel: false
      //       })
      //     }
      //   }
      // })
    } else {
      //Catch Error
      wx.showToast({
        title: '您还没有填写内容',
        icon: 'none',
        duration: 2000
      })
    }
    that.setData({
      inputValue: ''//将data的inputValue清空
    });
    return;
  }
})