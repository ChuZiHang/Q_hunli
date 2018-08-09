module.exports = {
  requestFetch: requestFetch,
  requestFetchLoginPost: requestFetchLoginPost,
  requestFetchPost: requestFetchPost,
  requestFetchGet: requestFetchGet,
  requestGet: requestGet
}

function requestFetch(apiHost, apiUrl) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiHost + apiUrl,
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

function requestFetchLoginPost(apiHost, apiUrl, postData) {
  console.log('登录===============================-------------------------', postData)
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiHost + apiUrl,
      method: 'POST',
      data: postData,
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

function requestFetchPost(apiHost, apiUrl, postData) {
  return new Promise((resolve, reject) => {
    var Authorization = wx.getStorageSync('Authorization')
    wx.request({
      url: apiHost + apiUrl,
      method: 'POST',
      data: postData,
      success: function (res) {
        resolve(res)
        console.log(2)
      },
      header: {
        'Authorization': Authorization
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

function requestFetchGet(apiHost, apiUrl, data) {
  return new Promise((resolve, reject) => {
    var Authorization = wx.getStorageSync('Authorization')
    wx.request({
      url: apiHost + apiUrl,
      method: 'GET',
      header: {
        'Authorization': Authorization
      },
      data: data,
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
function requestGet(apiHost, apiUrl, data) {
  return new Promise((resolve, reject) => {
    var Authorization = wx.getStorageSync('Authorization')
    wx.request({
      url: apiHost + apiUrl,
      method: 'GET',
      data: data,
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}