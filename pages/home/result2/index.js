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

    snum1:"90天",//奖杯1上的数字
    snum2:90,//奖杯2上的数字
    snum3:90,//奖杯3上的数字
    jiesuo1:0,//奖杯1新解锁
    jiesuo2:0,//
    jiesuo3:0,//
    username: '', //唯一确定登录的用户

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

    //奖牌
    const currentUser = AV.User.current();
    console.log(currentUser.attributes.username)
    this.setData({
      username: currentUser.attributes.username
    })
    const query = new AV.Query('BrushRecord');
    query.select(['date','success_flag','day_or_night'])
    query.equalTo('username', this.data.username);
    query.limit(1000)
    // query.contains('day_or_night','AM')
    // query.equalTo('success_flag', '1');
    // query.ascending('date');
    // console.log(this.data.username)
    query.find().then((records) => {
      // console.log(records)
      //第2个奖杯
      var sum = records.length
      console.log('sum=: '+sum)
      var jiesuo=0
      console.log(sum)
      if(sum<1) sum=1
      else if(sum==1) jiesuo=1
      else if(sum<9) sum=9
      else if(sum==9) jiesuo=1
      else if(sum<29) sum=29
      else if(sum==29) jiesuo=1
      else if(sum<39) sum=39
      else if(sum==39) jiesuo=1
      else if(sum<59) sum=59
      else if(sum==59) jiesuo=1
      else if(sum<99) sum=99
      else if(sum==99) jiesuo=1
      else if(sum<129) sum=129
      else if(sum==129) jiesuo=1
      else if(sum<159) sum=159
      else if(sum==159) jiesuo=1
      else if(sum<199) sum=199
      else jiesuo = 1
      this.setData({
        jiesuo2:jiesuo,
        snum2:sum
      })
      
      // console.log('jiesuo=: '+jiesuo)

      //第1个奖杯
      sum=0
      jiesuo=0
      // console.log('hi')
      var today=success_record[1].substr(0,10)
      console.log(today)
      var sum_today=0
      var sum_today_am=0
      var sum_today_pm=0
      var days = []
      var am=[]
      var pm=[]
      for(var i=0;i<records.length;i++){
        if(records[i].attributes.date==today) {      
          sum_today++
          if(records[i].attributes.day_or_night=="AM"&&records[i].attributes.success_flag==1) sum_today_am++//
          if(records[i].attributes.day_or_night=="PM"&&records[i].attributes.success_flag==1) sum_today_pm++//
        }
        if(days.indexOf(records[i].attributes.date)==-1) {
          days.push(records[i].attributes.date)
          if(records[i].attributes.day_or_night=="AM"&&records[i].attributes.success_flag==1){//
            am[days.indexOf(records[i].attributes.date)] = 1
          }else if(records[i].attributes.day_or_night=="PM"&&records[i].attributes.success_flag==1){//
            pm[days.indexOf(records[i].attributes.date)] = 1
          }
        }else{
          if(records[i].attributes.day_or_night=="AM"&&records[i].attributes.success_flag==1){//
            am[days.indexOf(records[i].attributes.date)] = 1
          }else if(records[i].attributes.day_or_night=="PM"&&records[i].attributes.success_flag==1){//
            pm[days.indexOf(records[i].attributes.date)] = 1
          }
        }
      }
      console.log('sumtoday: '+sum_today)
      console.log("days"+days)
      console.log("am"+am)
      console.log("pm"+pm)
      sum = days.length
      // loop1:
      if(sum<1) sum=1
      else if(sum==1) jiesuo=1
      else if(sum<3) sum=3
      else if(sum==3) jiesuo=1
      else if(sum<5) sum=5
      else if(sum==5) jiesuo=1
      else if(sum<7) sum=7
      else if(sum==7) jiesuo=1
      else if(sum<10) sum=10
      else if(sum==10) jiesuo=1
      else if(sum<20) sum=20
      else if(sum==20) jiesuo=1
      else if(sum<30) sum=30
      else if(sum==30) jiesuo=1
      else if(sum<50) sum=50
      else if(sum==50) jiesuo=1
      else if(sum<100) sum=100
      else jiesuo = 1
      if(sum_today>1&&jiesuo){
        jiesuo=0 
        sum++
        // console.log('sum now:'+sum)
        if(sum<1) sum=1
        else if(sum==1) jiesuo=1
        else if(sum<3) sum=3
        else if(sum==3) jiesuo=1
        else if(sum<5) sum=5
        else if(sum==5) jiesuo=1
        else if(sum<7) sum=7
        else if(sum==7) jiesuo=1
        else if(sum<10) sum=10
        else if(sum==10) jiesuo=1
        else if(sum<20) sum=20
        else if(sum==20) jiesuo=1
        else if(sum<30) sum=30
        else if(sum==30) jiesuo=1
        else if(sum<50) sum=50
        else if(sum==50) jiesuo=1
        else if(sum<100) sum=100
        else jiesuo = 1
        // console.log('loop')
        // goto:loop1
      }
      this.setData({
        snum1:sum+'天',
        jiesuo1:jiesuo
      })
      //第3个奖杯
      sum=0
      jiesuo=0
      for(var d=0;d<days.length;d++){
        if(am[d]&&pm[d]) sum++
      }
      console.log(sum)
      console.log('sum am:'+sum_today_am)
      console.log('sum pm:'+sum_today_pm)
      // loop2:
      if(sum<3) sum=3
      else if(sum==3) jiesuo=1
      else if(sum<7) sum=7
      else if(sum==7) jiesuo=1
      else if(sum<14) sum=14
      else if(sum==14) jiesuo=1
      else if(sum<30) sum=30
      else if(sum==30) jiesuo=1
      else if(sum<50) sum=50
      else if(sum==50) jiesuo=1
      else if(sum<80) sum=80
      else if(sum==80) jiesuo=1
      else if(sum<120) sum=120
      else if(sum==120) jiesuo=1
      else if(sum<200) sum=200
      else if(sum==200) jiesuo=1
      else if(sum<365) sum=365
      else jiesuo = 1
      if((sum_today_am==0||sum_today_pm!=1)&&jiesuo){
        jiesuo=0
        sum++
        if(sum<3) sum=3
        else if(sum==3) jiesuo=1
        else if(sum<7) sum=7
        else if(sum==7) jiesuo=1
        else if(sum<14) sum=14
        else if(sum==14) jiesuo=1
        else if(sum<30) sum=30
        else if(sum==30) jiesuo=1
        else if(sum<50) sum=50
        else if(sum==50) jiesuo=1
        else if(sum<80) sum=80
        else if(sum==80) jiesuo=1
        else if(sum<120) sum=120
        else if(sum==120) jiesuo=1
        else if(sum<200) sum=200
        else if(sum==200) jiesuo=1
        else if(sum<365) sum=365
        else jiesuo = 1
        // goto: loop2
      }
      this.setData({
        snum3:sum,
        jiesuo3:jiesuo
      })
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