// pages/cal/cal.js
import plugin from '../../components/calendar/plugins/index'
import selectable from '../../components/calendar/plugins/selectable'
plugin
  .use(selectable)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig:{
      theme: 'elegant',
      markToday: "今",
      highlightToday: true,
      firstDayOfWeek: 'Mon',
      disableMode: {
        type: 'after',
        date: 'false'
      },
    },
    toSet :[
      {
        year: 2021,
        month: 7,
        date: 3,
        class: 'good-date'
      },
      {
        year: 2021,
        month: 7,
        date: 4,
        class: 'normal-date'
      },
      {
        year: 2021,
        month: 7,
        date: 6,
        class: 'good-date'
      },
      {
        year: 2021,
        month: 7,
        date: 7,
        class: 'good-date'
      },
      {
        year: 2021,
        month: 7,
        date: 8,
        class: 'good-date'
      },
      {
        year: 2021,
        month: 7,
        date: 10,
        class: 'normal-date'
      },
      {
        year: 2021,
        month: 7,
        date: 11,
        class: 'normal-date'
      },
      {
        year: 2021,
        month: 7,
        date: 12,
        class: 'good-date'
      },
      {
        year: 2021,
        month: 7,
        date: 13,
        class: 'good-date'
      },
    ],
    selectedYear:0,
    selectedMonth:0,
    selectedDate:0
  },

  doSometing() {
    
  },

  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    this.setData({
      selectedYear:e.detail.calendar.curYear,
      selectedMonth:e.detail.calendar.curMonth,
      selectedDate:e.detail.calendar.curDate
    })
    // 获取日历组件上的 calendar 对象
    const calendar = this.selectComponent('#calendar').calendar
    calendar.setDateStyle(this.data.toSet)
  },
   /**
   * 选择日期后执行的事件
   */
  afterTapDate(e) {
    this.setData({
      selectedYear:e.year,
      selectedMonth:e.month,
      selectedDate:e.date
    })
  },
  // /**
  //  * 当日历滑动时触发
  //  */
  // onSwipe(e) {
  //   console.log('onSwipe', e.detail)
  // },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
    const calendar = this.selectComponent('#calendar').calendar
    calendar.setDateStyle(this.data.toSet)
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