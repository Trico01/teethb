
const app = getApp()
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
    console.log(this.data.quchi)
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
    console.log(this.data.quchi)
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

  }
})