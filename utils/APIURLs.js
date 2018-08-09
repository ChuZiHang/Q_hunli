// 工程接口文件出口
module.exports = {
  loginApp: loginApp,
  getWedding: getWedding,
  getBless: getBless,
  postBless: postBless,
  postUserMessage: postUserMessage,
  getUserMessage: getUserMessage
}

// 登录
function loginApp () {
  return '/app/login'
}

// 婚礼详情
function getWedding (appId) {
  return '/app/wedInfo?appId=' + appId
}

// 赞列表
function getBless (appId) {
  return '/app/user/star?appId=' + appId
}

// 点赞
function postBless () {
  return '/app/user/star'
}

// 留言
function postUserMessage () {
  return '/app/userMessage'
}

// 留言列表
function getUserMessage (appId){
  return '/app/userMessage?appId=' + appId
}