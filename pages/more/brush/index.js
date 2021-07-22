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
    yashuaHardList:["软毛","硬毛"],
    yashuaSizeList:["小刷头","大刷头"],
    yashuaType:[0,0],
    useReminder: false,
    useDate:'',
    dueDate:'',
    useTime:0,
  },

  bindchangeReminder(e){
    this.setData({
      useReminder:e.detail.value
    })
    const currentUser = AV.User.current();
    currentUser.set('brushReminder',e.detail.value)
    currentUser.save()
    if(e.detail.value==true){
      wx.navigateTo({
        url: './usetime/index',
      })
    }
  },
  
  bindtapEdit:function(e){
    wx.navigateTo({
      url: './usetime/index',
    })
  },
  bindtapReset:function(e){
    var today=new Date()
    const currentUser = AV.User.current();
    currentUser.set('useDate',today.toLocaleDateString())
    this.setData({
      useDate:today.toLocaleDateString()
    })
    today.setTime(today.getTime()+24*60*60*1000*90)
    currentUser.set('dueDate',today.toLocaleDateString())
    this.setData({
      dueDate:today.toLocaleDateString(),
      useTime:0,
    })
    currentUser.save()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      yashuaType:currentUser.attributes.brushType,
      useReminder:currentUser.attributes.brushReminder,
      useDate:currentUser.attributes.useDate,
      dueDate:currentUser.attributes.dueDate,
    })
    var date1=new Date()
    var date2=new Date(this.data.useDate)
    var total=(date1-date2)/1000
    this.setData({
      useTime: parseInt(total / (24*60*60))
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