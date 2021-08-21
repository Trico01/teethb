// pages/more_paste/index.js
const AV = require('../../../../libs/av-core-min.js');
const adapters = require('../../../../libs/leancloud-adapters-weapp.js');

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
    selectedTime:0,
    dateList:[0,14,30,60],
  },

  
  bindclickOK: function(e){
    const currentUser = AV.User.current();
    if(this.data.selectedTime==1){
      currentUser.set('brushUseTotal',0)
    }
    var tempDate= new Date()
    tempDate.setTime(tempDate.getTime()-24*60*60*1000*this.data.dateList[this.data.selectedTime-1])

    currentUser.set('useDate',tempDate.toLocaleDateString())

    tempDate.setTime(tempDate.getTime()+24*60*60*1000*90)
    currentUser.set('dueDate',tempDate.toLocaleDateString())
    currentUser.set('useTimeIndex',this.data.selectedTime)

    currentUser.save()

    wx.navigateBack()
  },

  bindtapTime: function(e){
    this.setData({
      selectedTime: e.currentTarget.dataset.id
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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