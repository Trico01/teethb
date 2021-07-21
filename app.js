// app.js
// const AV = require('./libs/av-core-min.js');
// const adapters = require('./libs/leancloud-adapters-weapp.js');

// AV.setAdapters(adapters);
// AV.init({
//   appId: "vqvxFtXlzyM0R3X2j3pDtWSJ-gzGzoHsz",
//   appKey: "cByY3sxv8znJvFlJYXkwXwpz",
//   serverURL: "https://vqvxftxl.lc-cn-n1-shared.com"
// });


App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    brushHard: 0,
    brushSize: 0,
    paste:0,
    yatao: 0,
    useReminder: false,
    useDate:'', // 表示上次更换牙刷的时间
    dueDate:'', // 表示预计更换时间
  }
})
