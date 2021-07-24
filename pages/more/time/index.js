// pages/more/brush/index.js
const AV = require('../../../libs/av-core-min.js');
const adapters = require('../../../libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
// 改为自己的，在leancloud控制台-设置-应用凭证中
AV.init({
  appId: "yelxhl0OPMa8AN0BOU5qndGU-gzGzoHsz",
  appKey: "FEy1FLbtbj4nP9rleSPtHq7j",
  serverURL: "https://yelxhl0o.lc-cn-n1-shared.com"
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prsnl_2:false,
    multiIndex:[2,0], // 默认3:00
    multiArray:[["1分","2分","3分","4分","5分"],["0秒","10秒","20秒","30秒","40秒","50秒"]],
  },
  bindPrsnlChange2(e){
    this.setData({
      prsnl_2: e.detail.value
    })
    const currentUser = AV.User.current();
    currentUser.set('prsnl_2',e.detail.value)
    currentUser.save()
    if (this.data.prsnl_2==false){
      this.setData({
        multiIndex:[2,0]
      })
      currentUser.set('setTimeIndex',[2,0])
      currentUser.save()
    }
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value,
    })
    const currentUser = AV.User.current();
    currentUser.set('setTimeIndex',e.detail.value)
    currentUser.save()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle ({title:"自定义时间"})
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
    const currentUser = AV.User.current();
    this.setData({
      prsnl_2:currentUser.attributes.prsnl_2,
      multiIndex:currentUser.attributes.setTimeIndex
    })
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

  }
})