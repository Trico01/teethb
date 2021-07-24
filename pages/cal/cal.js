// pages/cal/cal.js
const AV = require('../../libs/av-core-min.js');
const adapters = require('../../libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
// 改为自己的，在leancloud控制台-设置-应用凭证中
AV.init({
  appId: "yelxhl0OPMa8AN0BOU5qndGU-gzGzoHsz",
  appKey: "FEy1FLbtbj4nP9rleSPtHq7j",
  serverURL: "https://yelxhl0o.lc-cn-n1-shared.com"
});

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

function initChart1(canvas, width, height, dpr) {
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
      data: [{
        name:'早',
        icon:'rect'
      },{
        name:'晚',
        icon:'rect'
      }],
      itemWidth: 25, //矩形宽度
      itemHeight: 3, //矩形高度
      top: 15,
      left: 'center',
      z: 100,
    },
    grid: {
      left: 25,
      right: 25,
      bottom: 30,
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
            color: '#FFC8DD'
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
            color: '#cdb4db'
          }
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

function initChart2(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color:['#00EE00','#FF9F7F'],
    legend: {
      data: [{
        name:'早',
        icon:'rect'
      },{
        name:'晚',
        icon:'rect'
      }],
      itemWidth: 25, //矩形宽度
      itemHeight: 3, //矩形高度
      top: 15,
      left: 'center',
      z: 100,
    },
    grid: {
      left: 25,
      right: 25,
      bottom: 30,
      top: 60,
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [22,25,28,1,4,7,10,13,16,19],
      axisLine:{
        show: false
      },
      axisTick:{
        show:false
      },
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      min:1.5,
      max:3
    },
    series: [{
      name: "早",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [2.1,2.5,2.4,2.5,2.7,2.5,2.1,2.8,2.7,2.7],
      lineStyle:{
        width:2.5,
      },
    }, {
      name: "晚",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [3,3,3,2.9,2.6,2.9,2.8,2.7,3,3], //无数据时''即可
      lineStyle:{
        width:2.5,
      },
    }]
  };

  chart.setOption(option);
  return chart;
}

function initChart3(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color:['#00EE00','#FF9F7F'],
    legend: {
      data: [{
        name:'早',
        icon:'rect'
      },{
        name:'晚',
        icon:'rect'
      }],
      itemWidth: 25, //矩形宽度
      itemHeight: 3, //矩形高度
      top: 15, // 距离表格上边的距离
      left: 'center',
      z: 100,
      dotted: false
    },
    grid: {
      left: 25,
      right: 25,
      bottom: 30,
      top: 60,
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [7,8,9,10,11,12,1,2,3,4,5,6],
      axisLine:{
        show: false
      },
      axisTick:{
        show:false
      },
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      min:1.5,
      max:3
    },
    series: [{
      name: "早",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [2.2,2.5,2.4,2.7,2.9,2.5,2.4,2.7,2.9,2.5,2.6,2.7],
      lineStyle:{
        width:2.5,
      }
    }, {
      name: "晚",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [3,3,3,2.9,2.9,2.8,2.9,2.7,3,3,2.8,2.8], //无数据时''即可
      lineStyle:{
        width:2.5,
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

function initChart4(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color:['white','white','#fd5454','#d4d4d4','#fd5454','#d4d4d4'],
    tooltip: {
      show: false
    },
    legend: {
      data: [{
        name:'出血',
        icon:'rect'
      },{
        name:'正常',
        icon:'rect'
      }],
      itemWidth: 25, //矩形宽度
      itemHeight: 6, //矩形高度
      top: 25,
      left: 'center',
      z: 100,
    },
    grid: {
      left: 25,
      right: 25,
      bottom: 30,
      top: 60,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
        axisLine: {
          lineStyle: {
            color: '#ffffff',
            width: 5,
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        splitLine: { show: false },
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        max:1.2,
        min:-1.2,
        axisLabel: {
          formatter: function (value) {
            var texts = [];
            if(value>0&&value<1)
              texts.push('晚')
            else if(value<0&&value>-1)
              texts.push('早')
            return texts;
          }
        }
      }
    ],
    series: [
      {
        name: '空',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
      },
      {
        name: '白',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [-0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05],
      },
      {
        name: '晚T',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [1, 0, 1, 1, 1, 0, 1],
      },
      {
        name: '晚F',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [0, 1, 0, 0, 0, 1, 0],
      },
      {
        name: '出血',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [-1, -1, -1, -1, -1, 0, -1],
      },
      {
        name: '正常',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [0, 0, 0, 0, 0, -1, 0],
      },

    ]
  };

  chart.setOption(option);
  return chart;
}

function initChart5(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color:['white','white','#fd5454','#d4d4d4','#fd5454','#d4d4d4'],
    tooltip: {
      show: false
    },
    legend: {
      data: [{
        name:'出血',
        icon:'rect'
      },{
        name:'正常',
        icon:'rect'
      }],
      itemWidth: 25, //矩形宽度
      itemHeight: 6, //矩形高度
      top: 25,
      left: 'center',
      z: 100,
    },
    grid: {
      left: 25,
      right: 25,
      bottom: 30,
      top: 60,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: [22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        axisLine: {
          lineStyle: {
            color: '#ffffff',
            width: 5,
          }
        },
        axisLabel: {
          color: '#666',
          formatter: function (value) {
            var texts = [];
            if(value%3==0)
              texts.push(value)
            else
              texts.push('')
            return texts;
          }
        }
      }
    ],
    yAxis: [
      {
        splitLine: { show: false },
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        max:1.2,
        min:-1.2,
        axisLabel: {
          formatter: function (value) {
            var texts = [];
            if(value>0&&value<1)
              texts.push('晚')
            else if(value<0&&value>-1)
              texts.push('早')
            return texts;
          }
        }
      }
    ],
    series: [
      {
        name: '空',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,0.05,0.05],
      },
      {
        name: '白',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [-0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05,-0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05,-0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05,-0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05,-0.05,-0.05],
      },
      {
        name: '晚T',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      },
      {
        name: '晚F',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [0,1,0,0,0,1,0,0,0,1,0,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,0,1,1,0],
      },
      {
        name: '出血',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [-1, -1, -1, -1, -1, 0, -1, 0, -1, -1, 0, 0, 0, -1, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, -1, 0],
      },
      {
        name: '正常',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: [0,0,0,0,0,-1,0,-1,0,0,-1,-1,-1,0,-1,-1,0,0,-1,-1,-1,-1,-1,-1,0,0,-1,-1,0,-1],
      },
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
    toSet: [],
    selectedYear: 0,
    selectedMonth: 0,
    selectedDate: 0,
    ec1: {
      onInit: initChart1
    },
    ec2: {
      onInit: initChart2
    },
    ec3: {
      onInit: initChart3
    },
    ec4: {
      onInit: initChart4
    },
    ec5: {
      onInit: initChart5
    },
    tab1:0,
    tab2:0,
  },
  bindchangeTab1:function(e){
    this.setData({
      tab1:e.detail.index
    })
  },
  bindchangeTab2:function(e){
    this.setData({
      tab2:e.detail.index
    })
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
    const query = new AV.Query('Mock');
    query.get('60fb7cae34bfda01e0e83025').then((mockInfo) => {
      const tmp=mockInfo.get('toSet')
      calendar.setDateStyle(tmp)
    });
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
    const query = new AV.Query('Mock');
    query.get('60fb7cae34bfda01e0e83025').then((mockInfo) => {
      const tmp=mockInfo.get('toSet')
      calendar.setDateStyle(tmp)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '日历',
    })
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