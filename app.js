//app.js
var apiHost = require('/utils/APIHosts.js')
var apiUrls = require('/utils/APIURLs.js')
var fetch = require('/utils/Fetch.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.appId = 1
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('res', res.userInfo)
              this.globalData.userInfo = res.userInfo
              
              // 登录
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  console.log('res==========', res.code)
                  fetch.requestFetchLoginPost(apiHost.hostRoot(), apiUrls.loginApp() , {
                    'appId': 1,
                    'code': res.code,
                    'nickName': this.globalData.userInfo.nickName,
                    'gender': this.globalData.userInfo.gender,
                    'avatarUrl': this.globalData.userInfo.avatarUrl
                  }).then(response => {
                    console.log('response6666666666666', response)
                    wx.setStorageSync('openId', response.data.openId)
                    wx.reLaunch({
                      url: '/pages/index/index',
                    });
                  }).catch(error => {
                    console.log(error)
                  })
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log("用户授权失败");
          wx.redirectTo({
            url: '/pages/authorize/authorize'
          });
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})