// pages/more_paste/index.js

var app = getApp()

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
      { url: "https://z3.ax1x.com/2021/07/21/WwVJ10.png", name: '抗敏感',id:"4"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVUnU.png", name: '护龈' ,id:"5"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVaBF.png", name: '竹盐',id:"6"},
      { url: "https://z3.ax1x.com/2021/07/21/WwVd74.png", name: '药用',id:"7"},
      { url: "https://z3.ax1x.com/2021/07/21/WwV0AJ.png", name: '多效',id:"8"},
    ],
    selected:0
  },
  bindtapYagao: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.id
    })    
  },
  bindclickOK: function(e){
    app.globalData.paste=this.data.selected
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
      selected:app.globalData.paste
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