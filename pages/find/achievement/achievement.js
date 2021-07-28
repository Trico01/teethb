// pages/find/achievement/achievement.js
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
    day1:20,
    day2:30,
    day3:50,
    username: '', //唯一确定登录的用户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title:'成就勋章'})
    const currentUser = AV.User.current();
    console.log(currentUser.attributes.username)
    this.setData({
      username: currentUser.attributes.username
    })

    const query = new AV.Query('BrushRecord');
    // query.select(['date','success_flag'])
    query.equalTo('username', this.data.username);
    query.limit(1000)
    // query.contains('day_or_night','AM')
    // query.equalTo('success_flag', '1');
    // query.ascending('date');
    query.find().then((records) => {
      // console.log(records[0].attributes.date)
      console.log(records)
      //day2
      console.log('day2: '+records.length)
      this.setData({
        day2:records.length,
      })
      //
      //day1
      var days = []
      // if(days.indexOf('2016-3-6')!=-1){
      //   console.log('yes')
      // }else{
      //   console.log('no')
      // }
      // console.log(days)
      var sobj=[]
      var am = []
      var pm = []
      for (var i=0;i<records.length;i++){
        if(records[i].attributes.success_flag){
          if(sobj.indexOf(records[i].attributes.date)==-1){
            sobj.push(records[i].attributes.date)
            if(records[i].attributes.day_or_night=="AM"){
              am[sobj.length-1] = 1
            }else if(records[i].attributes.day_or_night=="PM"){
              pm[sobj.length-1] = 1
            }
          }else{
            if(records[i].attributes.day_or_night=="AM"){
              am[sobj.indexOf(records[i].attributes.date)] = 1
            }else if(records[i].attributes.day_or_night=="PM"){
              pm[sobj.indexOf(records[i].attributes.date)] = 1
            }
          }
        }
        // console.log(records[i].attributes.success_flag)
        if(days.indexOf(records[i].attributes.date)!=-1){
          // console.log('has in')
        }else{
          days.push(records[i].attributes.date)
          // console.log('push in')
        }
      }
      console.log("day1: "+days.length)
      this.setData({
        day1:days.length,
      })
      console.log(sobj)
      console.log(am)
      console.log(pm)
      var sum = 0
      for(var i=0;i<sobj.length;i++){
        if(am[i]&&pm[i]){
          sum++
        }
      }
      console.log(sum)
      this.setData({
        day3:sum,
      })
    }); 
    
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