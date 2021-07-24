// pages/home/home.js
const app = getApp()
var setTimer;//把时间函数变量设为全局
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model_switch: 0,
    funcFlag: 0, //0刷牙，1牙线，2漱口
    myFuncFlag: [
      0, 0, 0
    ],

    start_flag: false,//倒计时开始或暂停的flag，false为暂停
    timestamp: 26,//倒计时的总共的秒数
    time: '0:26',//从timestamp转换成的‘xx：xx’格式的时间，用来显示在wxml页面
    textValue: 0,

    brush_state: 0,//表示刷牙的位置状态
    bursh_time: [26,27,27,27,27,27,27],//不同位置的刷牙时间
    brush_mode: 0,//刷牙模式，0表示成人模式，1表示儿童模式
  },

  myFunc() {
    const newdata = this.data.myFuncFlag[this.data.funcFlag] + 1
    const flag = this.data.myFuncFlag
    if (flag[0] != 2 && flag[1] != 1 && flag[2] != 1) {
      this.setData({
        [`myFuncFlag[${this.data.funcFlag}]`]: newdata
      })
    }
  },

  change_L() {
      this.setData({
        funcFlag: (this.data.funcFlag + 2) % 3,
        myFuncFlag: [0,0,0]
      })
  },

  change_R() {
      this.setData({
        funcFlag: (this.data.funcFlag + 1) % 3,
        myFuncFlag: [0,0,0]
      })
  },


  play: function () {//点击play按钮
    if(this.data.start_flag== true ) return
    console.log("play")
    this.setData({
      start_flag: true//把flag置为true
    })
    if (this.data.start_flag == true) this.timer();//如果flag为true 开始倒计时函数timer()
    else {//否则即为停止，清除全局变量的计时函数，实现时间的停止
      clearInterval(setTimer);
    }
  },

  stop: function () {//点击stop按钮
    console.log("stop")
    this.setData({
      start_flag: false//把flag置为false
    })
    if (this.data.start_flag == true) this.timer();//如果flag为true 开始倒计时函数timer()
    else {//否则即为停止，清除全局变量的计时函数，实现时间的停止
      clearInterval(setTimer);
    }
  },

  reset: function (e) {//点击reset按钮,重置并清除全局变量的计时函数
    console.log("reset")
    //监测是否双击
    // 获取这次点击时间
    var thisTime = e.timeStamp;
    // 获取上次点击时间 默认为0
    var lastTime = this.data.lastTime;
    if (lastTime != 0) {
      if (thisTime - this.data.lastTime < 500)
        //发生了双击事件
        this.setData({
          brush_state: 0
        })
    }
    // 赋值
    this.setData({
      lastTime: thisTime
    })

    this.setData({
      timestamp: this.data.bursh_time[this.data.brush_state],
      start_flag: false,
      time: '0:'+String(this.data.bursh_time[this.data.brush_state])
    })
    clearInterval(setTimer);
    this.stop()
  },

  time_change: function (timestamp) {//时间戳转化成‘xx:xx’的可读形式
    var timem = 0, times = 0;
    timem = parseInt(timestamp / 60);
    times = ((timestamp % 60 < 10) ? ('0' + timestamp % 60) : timestamp % 60);
    return (timem + ':' + times);
  },

  //倒计时函数
  timer: function () {
    if(this.data.brush_state == 6){
      this.setData({
        brush_state: 0
      })
      this.reset()
    }
    let promise = new Promise((resolve, reject) => {//ES6的语法，用就行，不需要看懂
      setTimer = setInterval(//时间循环函数
        () => {
          this.setData({//每隔一秒，时间戳-1，对应转化一次timestamp
            timestamp: this.data.timestamp - 1,
            time: this.time_change(this.data.timestamp - 1)
          })
          if (this.data.timestamp == 0) {//如果时间为0，重置数据
            this.setData({
              brush_state: this.data.brush_state+1
            })
            this.setData({
              timestamp: this.data.bursh_time[this.data.brush_state],
              start_flag: false,
              time: '0:'+String(this.data.bursh_time[this.data.brush_state])
            })
            resolve(setTimer)
            if(this.data.model_switch == false) this.play()
            else this.stop()
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

  model_switch: function() {
    this.setData({
      model_switch: !this.data.model_switch
    })
    console.log(this.data.model_switch)
  },

  bindTextInput: function (event) {//绑定input框的数据
    this.setData({
      textValue: event.detail.value
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
    //修改刷牙时间
    this.change_time()
    //获得popup组件
    this.popup_food = this.selectComponent("#popup_food");
    this.popup_brush = this.selectComponent("#popup_brush");
    this.popup_food.showPopup();
  },

  //修改刷牙时间
  change_time() {
    
  },

  //取消事件
  _error() {
    this.popup_food.hidePopup();
    this.popup_brush.hidePopup();
  },
  //确认事件
  _success() {
    this.popup_food.hidePopup();
    this.popup_brush.showPopup();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
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