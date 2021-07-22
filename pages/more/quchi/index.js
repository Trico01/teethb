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
    upleft: 0,
    upmid: 0,
    upright: 0,
    downleft: 0,
    downmid: 0,
    downright: 0,//六个值代表六个区域是否有龋齿，0代表无
    quchi: [0,0,0,0,0,0],
  },

  quchi_ul(){
    this.setData({
      upleft: !this.data.upleft
    })
  },

  quchi_um(){
    this.setData({
      upmid: !this.data.upmid
    })
  },

  quchi_ur(){
    this.setData({
      upright: !this.data.upright
    })
  },

  quchi_dl(){
    this.setData({
      downleft: !this.data.downleft
    })
  },

  quchi_dm(){
    this.setData({
      downmid: !this.data.downmid
    })
  },

  quchi_dr(){
    this.setData({
      downright: !this.data.downright
    })
  },

  confirm(){
    this.setData({
      quchi: [
        this.data.upleft,
        this.data.upmid,
        this.data.upright,
        this.data.downleft,
        this.data.downmid,
        this.data.downright
      ]
    })
    const currentUser = AV.User.current();
    currentUser.set('quchi',this.data.quchi)
    currentUser.save()
  },

  reset(){
    this.setData({
      upleft: 0,
      upmid: 0,
      upright: 0,
      downleft: 0,
      downmid: 0,
      downright: 0,
      quchi:[
        0,0,0,0,0,0
      ]
    })
    const currentUser = AV.User.current();
    currentUser.set('quchi',[0,0,0,0,0,0])
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
      quchi:currentUser.attributes.quchi
    })
    console.log(this.data.quchi)
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