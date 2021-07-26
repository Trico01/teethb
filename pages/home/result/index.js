// pages/home/result/index.js

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
    day: [],
    yearmonth: '',
    time: "09:03",
    amorpm: 0, // 0上午1下午
    duration: "2分39秒",
    useGum: true, // 是否开启牙龈保护询问
    quchi: true, // 是否有龋齿
    yatao: true, // 是否有透明牙套
    changeBrush: true, // 是否离更换牙刷日期dueDate（查询时注意先判断useReminder再用dueDate）在5日内
    changeBrushDays: 2, // 离dueDate还有几天

    gumConfirmed: false, // 询问后是否点击了是或否
    gumBleed: false, // 是否出血（如果没开启牙龈保护，也要传，值为false）
  },

  bindtapYes: function(e){
    this.setData({
      gumConfirmed: true,
      gumBleed: true,
    })
    const query=new AV.Query('BrushRecord')
    query.equalTo('username',this.data.success_record[0])
    query.equalTo('date',this.data.success_record[1])
    query.equalTo('tt',this.data.success_record[2])
    query.first().then((thisRecord) => {
      thisRecord.set('gumBleed',1)
      thisRecord.save()
    });

  },
  bindtapNo: function(e){
    this.setData({
      gumConfirmed: true,
      gumBleed: false,
    })
  },
  bindtapArrow: function(e){
    wx.navigateTo({
      url: '../../find/achievement/achievement',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle ({title:"刷牙完成！"})

    // 读取刷牙界面缓存的数据
    var success_record = this.getParams('success_record');
    console.log(success_record);
    this.setData({
      success_record : success_record
    })
    var year = success_record[1].substr(0,4)
    var month = success_record[1].substr(5,2)
    month = String(parseInt(month))
    var day = success_record[1].substr(8)
    var time = success_record[2].substr(0,5)
    var day_or_night = success_record[4]
    console.log(day_or_night)
    if (day_or_night=="AM") {
      this.setData({
        amorpm: 0,
      })
    }else{
      this.setData({
        amorpm: 1,
      })
    }
    var t_total = success_record[3]
    t_total = parseInt(t_total)
    var minut = String(Math.floor(t_total/60))
    var second = String(t_total % 60)
    var duration = minut + '分' + second + '秒'
    this.setData({
      day: day,
      yearmonth: year + '年' + month + '月',
      time: time,
      duration: duration,
    })
  },

  getParams: function (a) {
    return wx.getStorageSync(a)
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