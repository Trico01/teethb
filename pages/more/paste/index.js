// pages/more_paste/index.js
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
    yagaoList:[
      { url: "http://oss.raynor.top/teethb/p2.png", name: '美白',id:"0"},
      { url: "http://oss.raynor.top/teethb/p3.png", name: '清新',id:"1"},
      { url: "http://oss.raynor.top/teethb/p4.png", name: '防蛀',id:"2"},
      { url: "http://oss.raynor.top/teethb/p5.png", name: '固齿',id:"3"},
      { url: "http://oss.raynor.top/teethb/p6.png", name: '抗敏感',id:"4"},
      { url: "http://oss.raynor.top/teethb/p7.png", name: '护龈' ,id:"5"},
      { url: "http://oss.raynor.top/teethb/p3.png", name: '竹盐',id:"6"},
      { url: "http://oss.raynor.top/teethb/p4.png", name: '药用',id:"7"},
      { url: "http://oss.raynor.top/teethb/p8.png", name: '多效',id:"8"},
    ],
    selected:0
  },
  bindtapYagao: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.id
    })    
  },
  bindclickOK: function(e){
    const currentUser = AV.User.current();
    currentUser.set('pasteType',this.data.selected)
    currentUser.save()
    wx.navigateBack()
  },
  bindclickCancel: function(e){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentUser = AV.User.current();
    this.setData({
      selected:currentUser.attributes.pasteType
    })
    wx.setNavigationBarTitle ({title:""})

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

  },
})