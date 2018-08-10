// pages/user/authorize.js
const app = getApp()
var apiHost = require('../../utils/APIHosts.js')
var apiUrls = require('../../utils/APIURLs.js')
var fetch = require('../../utils/Fetch.js')
var appid = app.globalData.appid;
Page({
  data: {
    userInfo: {}
  },
  userInfoHandler: function (e) {
    console.log(e);
    console.log("====================================用户授权============================================");
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("授权确认&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", res.userInfo);
              
              // 登录
              wx.login({
                success: response => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  console.log('response==========', response.code)
                  fetch.requestFetchLoginPost(apiHost.hostRoot(), apiUrls.loginApp(), {
                    'appId': 1,
                    'code': response.code,
                    'nickName': res.userInfo.nickName,
                    'gender': res.userInfo.gender,
                    'avatarUrl': res.userInfo.avatarUrl
                  }).then(response1 => {
                    wx.setStorageSync('openId', response1.data.openId)
                    wx.reLaunch({
                      url: '/pages/index/index',
                    });
                  }).catch(error => {
                    console.log(error)
                  })
                }
              })
            }
          });

        } else {
          wx.showModal({
            content: '您拒绝了授权', showCancel: false
          });
        }
      }
    });
  }
});