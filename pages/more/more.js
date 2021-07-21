// pages/more/more.js

var app=getApp()


Page({
  data: {
    birth: '2001-07-25', // 用户生日 "YYYY-MM-DD"
    hand:'0', // 惯用手，0右手，1左手
    handOption:["右手","左手"],
    prsnl_1: false, // 个性化
    prsnl_2: false,
    prsnl_3: false,
    yagao: 0,
    yagaoList:["美白","清新","防蛀","固齿","抗敏感","护龈","竹盐","药用","多效"], // 和more_paste的同名列表是相同的，后续可删减
    today:'', // 当前日期
    zjType:0,
    zhengjiList:["无","唇侧金属托槽","唇侧陶瓷托槽","舌侧托槽","隐形矫正牙套"],
    multiIndex:[2,0], // 默认3:00
    multiArray:[["1分","2分","3分","4分","5分"],["0秒","10秒","20秒","30秒","40秒","50秒"]],

  },

  bindBirthChange(e){
    this.setData({
      birth: e.detail.value
    })
  },
  bindHandChange(e){
    this.setData({
      hand: e.detail.value      
    })
  },
  bindPrsnlChange1(e){
    this.setData({
      prsnl_1: e.detail.value
    })
  },
  bindPrsnlChange2(e){
    this.setData({
      prsnl_2: e.detail.value
    })
    if (this.data.prsnl_2==false){
      this.setData({
        multiIndex:[2,0]
      })
    }
  },

  bindPrsnlChange3(e){
    this.setData({
      prsnl_3: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindcancelTime: function (e) {
    this.setData({
      prsnl_2: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title:'个人中心'})
    var d = new Date()
    var tempString=d.toLocaleDateString().replace(/\//g,"-")
    this.setData({
      today: tempString
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
    this.getTabBar().init();
    this.setData({
      yagao:app.globalData.paste,
      yashuaHard:app.globalData.brushHard,
      yashuaSize:app.globalData.brushSize,
      zjType:app.globalData.yatao
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