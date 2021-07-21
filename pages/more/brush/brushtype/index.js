// pages/more_paste/index.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    yagaoList:[
      { url: "./image/1.png", name: '美白',id:"0"},
      { url: "./image/2.png", name: '清新',id:"1"},
      { url: "./image/3.png", name: '防蛀',id:"2"},
      { url: "./image/4.png", name: '固齿',id:"3"},
      { url: "./image/5.png", name: '抗敏感',id:"4"},
      { url: "./image/6.png", name: '护龈' ,id:"5"},
      { url: "./image/7.png", name: '竹盐',id:"6"},
      { url: "./image/8.png", name: '药用',id:"7"},
      { url: "./image/9.png", name: '多效',id:"8"},
    ],
    selectedHard:0,
    selectedSize:0,
  },

  bindtapBrushHard:function(e){
    this.setData({
      selectedHard: e.currentTarget.dataset.id
    })
  },
  bindtapBrushSize:function(e){
    this.setData({
      selectedSize: e.currentTarget.dataset.id
    })    
  },
  bindclickOK: function(e){
    app.globalData.brushHard=this.data.selectedHard
    app.globalData.brushSize=this.data.selectedSize
    wx.navigateBack()
  },
  bindclickCancel: function(e){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectedHard:app.globalData.brushHard,
      selectedSize:app.globalData.brushSize
    })
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