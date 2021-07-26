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
      { url: "https://z3.ax1x.com/2021/07/21/WwV3hn.png", name: '美白',id:"0"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVYcV.png", name: '清新',id:"1"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVGpq.png", name: '防蛀',id:"2"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVtXT.png", name: '固齿',id:"3"},
      { url: "https://z3.ax1x.com/2021/07/25/W2PJ4U.png", name: '抗敏感',id:"4"},
      { url: "https://z3.ax1x.com/2021/07/25/W2PN34.png", name: '护龈' ,id:"5"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVaBF.png", name: '竹盐',id:"6"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVd74.png", name: '药用',id:"7"},
      { url: "https://z3.ax1x.com/2021/07/25/W2PtCF.png", name: '多效',id:"8"},
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