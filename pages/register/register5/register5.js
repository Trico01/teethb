// pages/register/register5/register5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 0,//0 男,1女,2特殊
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
  toNext(){
    wx.redirectTo({
      url: '../register6/register6',
    })
  },
  boy() {
    this.setData({
      gender: 0,
    })
  },
  girl() {
    this.setData({
      gender: 1,
    })
  },
  other() {
    this.setData({
      gender: 2,
    })
  },
})