Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindtapExit: function(e){
    wx.switchTab({
      url: '/pages/more/more',
    })
  },
  bindtapComplete1: function(e){
    wx.navigateTo({
      url: '/pages/children/level1/guides1/guides', // 页面跳转至该url 这个跳转过去是有返回箭头的那种（我也说不清
    })
  },
  bindtapComplete2: function(e){
    wx.navigateTo({
      url: '/pages/children/level2/guides2/guides', // 页面跳转至该url 这个跳转过去是有返回箭头的那种（我也说不清
    })
  },  bindtapComplete3: function(e){
    wx.navigateTo({
      url: '/pages/children/level3/guides3/guides', // 页面跳转至该url 这个跳转过去是有返回箭头的那种（我也说不清
    })
  },  bindtapComplete4: function(e){
    wx.navigateTo({
      url: '/pages/children/level4/guides4/guides', // 页面跳转至该url 这个跳转过去是有返回箭头的那种（我也说不清
    })
  },  bindtapComplete5: function(e){
    wx.navigateTo({
      url: '/pages/children/level5/guides5/guides', // 页面跳转至该url 这个跳转过去是有返回箭头的那种（我也说不清
    })
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
  //onPullDownRefresh: function () {

  //},

  /**
   * 页面上拉触底事件的处理函数
   */
  //onReachBottom: function () {

  //},

  /**
   * 用户点击右上角分享
   */
  //onShareAppMessage: function () {

  //}
})