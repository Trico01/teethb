// // app.js
// const AV = require('/libs/av-core-min.js');
// const adapters = require('/libs/leancloud-adapters-weapp.js');

// AV.setAdapters(adapters);
// // 改为自己的，在leancloud控制台-设置-应用凭证中
// AV.init({
//   appId: "yelxhl0OPMa8AN0BOU5qndGU-gzGzoHsz",
//   appKey: "FEy1FLbtbj4nP9rleSPtHq7j",
//   serverURL: "https://yelxhl0o.lc-cn-n1-shared.com"
// });
App({
  onLaunch() {
    // const currentUser = AV.User.current();
    // console.log(currentUser)
    // if(currentUser==null){
    //   wx.reLaunch({
    //     url: '/pages/register/register',
    //   })
    // }
  },
  globalData: {
  },
})
