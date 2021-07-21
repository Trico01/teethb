// pages/cal/cal.js
import plugin from '../../components/calendar/plugins/index'
import selectable from '../../components/calendar/plugins/selectable'
import * as echarts from '../../components/ec-canvas/echarts'

plugin
  .use(selectable)

let chart = null;
// 条形图所用数据
// 不设为全局的方法？
let amData = [2, 2.2, 2.1, 2.5, 2.1, 2.8, 2.9];
let pmData = [3, 2.8, 3, 3, 2.7, 2.8, 2.8];
// 日历所需标注数据在page.data.toSet

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['早', '晚'],
      top: 5,
      itemHeight: 4,
      itemWidth: 20,
      itemGap: 20
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 60,
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '早',
        type: 'bar',
        barWidth: 7,
        label: {
          normal: {
            show: false,
          }
        },
        data: amData,
        itemStyle: {
          normal: {
            barBorderRadius: 6,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#a8ff78' // 0% 处的颜色
              }, {
                offset: 1, color: '#78ffd6' // 100% 处的颜色
              }],
              globalCoord: true // 缺省为 false
            },
          },
          emphasis: {
            color: '#37a2da'
          }
        }
      },
      {
        name: '晚',
        type: 'bar',
        barWidth: 7,
        label: {
          normal: {
            show: false,
          }
        },
        data: pmData,
        itemStyle: {
          normal: {
            barBorderRadius: 6,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#be93c5' // 0% 处的颜色
              }, {
                offset: 1, color: '#7bc6cc' // 100% 处的颜色
              }],
              globalCoord: true // 缺省为 false
            },
          },
          emphasis: {
            color: '#37a2da'
          }
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}


Page({
  data: {
    calendarConfig: {
      theme: 'elegant',
      markToday: "今",
      highlightToday: true,
      firstDayOfWeek: 'Mon',
      disableMode: {
        type: 'after',
        date: 'false'
      },
    },
    toSet: [
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
    selectedYear: 0,
    selectedMonth: 0,
    selectedDate: 0,
    ec: {
      onInit: initChart
    },
  },

  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    this.setData({
      selectedYear: e.detail.calendar.curYear,
      selectedMonth: e.detail.calendar.curMonth,
      selectedDate: e.detail.calendar.curDate
    })
    // 获取日历组件上的 calendar 对象
    const calendar = this.selectComponent('#calendar').calendar
    // 加function2:获取selected年月的标注数据
    calendar.setDateStyle(this.data.toSet)
    // 加function1:获取selected日期所在周的条形图数据

  },
  /**
  * 选择日期后执行的事件
  */
  afterTapDate(e) {
    this.setData({
      selectedYear: e.detail.year,
      selectedMonth: e.detail.month,
      selectedDate: e.detail.date
    })
    // 加function1:获取selected日期所在周的条形图数据
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
    let curYear = e.detail.current.year
    let curMonth = e.detail.current.month
    const calendar = this.selectComponent('#calendar').calendar
    // 加function2:获取curYear、curMonth的标注数据
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
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
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