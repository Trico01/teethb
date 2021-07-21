// pages/more/brush/index.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    yashuaHardList:["软毛","硬毛"],
    yashuaSizeList:["小刷头","大刷头"],
    yashuaHard: 0,
    yashuaSize: 0,
    useReminder: false,
    useDate:'',
    dueDate:'',
    useTime:0,
  },

  bindchangeReminder(e){
    this.setData({
      useReminder:e.detail.value
    })
    app.globalData.useReminder=e.detail.value
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
    app.globalData.useDate=today.toLocaleDateString()
    today.setTime(today.getTime()+24*60*60*1000*90)
    app.globalData.dueDate=today.toLocaleDateString()
    this.setData({
      useDate:app.globalData.useDate,
      dueDate:app.globalData.dueDate,
      useTime:0,
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
    this.setData({
      yashuaHard:app.globalData.brushHard,
      yashuaSize:app.globalData.brushSize,
      useReminder:app.globalData.useReminder,
      useDate:app.globalData.useDate,
      dueDate:app.globalData.dueDate,
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