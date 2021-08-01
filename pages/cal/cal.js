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
// 条形图所用数据mock数据
// let amData = [2, 2.2, 2.1, 2.5, 2.1, 2.8, 2.9];
// let pmData = [3, 2.8, 3, 3, 2.7, 2.8, 2.8];
// 日历所需标注数据在page.data.toSet

let chrt1AM = [0, 0, 0, 0, 0, 0, 0]
let chrt1PM = [0, 0, 0, 0, 0, 0, 0]

let chrt4AM = [0, 0, 0, 0, 0, 0, 0]
let chrt4AM_F = [-1, -1, -1, -1, -1, -1, -1]
let chrt4PM = [0, 0, 0, 0, 0, 0, 0]
let chrt4PM_F = [1, 1, 1, 1, 1, 1, 1]



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
        name: '早',
        icon: 'rect'
      }, {
        name: '晚',
        icon: 'rect'
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
        data: chrt1AM,
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
        data: chrt1PM,
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
    color: ['#00EE00', '#FF9F7F'],
    legend: {
      data: [{
        name: '早',
        icon: 'rect'
      }, {
        name: '晚',
        icon: 'rect'
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
      data: [22, 25, 28, 1, 4, 7, 10, 13, 16, 19],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
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
      min: 1.5,
      max: 3
    },
    series: [{
      name: "早",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [2.1, 2.5, 1.5, 1.8, 2.7, 2.5, 1.6, 2.8, 1.6, 1.4],
      lineStyle: {
        width: 2.5,
      },
    }, {
      name: "晚",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [1.9, 2.4, 1.6, 2.1, 2.6, 2.5, 2.8, 2.7, 2.5, 1.9], //无数据时''即可
      lineStyle: {
        width: 2.5,
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
    color: ['#00EE00', '#FF9F7F'],
    legend: {
      data: [{
        name: '早',
        icon: 'rect'
      }, {
        name: '晚',
        icon: 'rect'
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
      data: [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
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
      min: 1.5,
      max: 3
    },
    series: [{
      name: "早",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [2.2, 2.5, 2.4, 2.7, 2.9, 2.5, 2.4, 2.7, 2.9, 2.5, 2.6, 2.7],
      lineStyle: {
        width: 2.5,
      }
    }, {
      name: "晚",
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: [3, 3, 3, 2.9, 2.9, 2.8, 2.9, 2.7, 3, 3, 2.8, 2.8], //无数据时''即可
      lineStyle: {
        width: 2.5,
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
    color: ['white', 'white', '#fd5454', '#d4d4d4', '#fd5454', '#d4d4d4'],
    tooltip: {
      show: false
    },
    legend: {
      data: [{
        name: '出血',
        icon: 'rect'
      }, {
        name: '正常',
        icon: 'rect'
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
        data: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
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
        max: 1.2,
        min: -1.2,
        axisLabel: {
          formatter: function (value) {
            var texts = [];
            if (value > 0 && value < 1)
              texts.push('晚')
            else if (value < 0 && value > -1)
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
        data: chrt4PM,
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
        data: chrt4PM_F,
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
        data: chrt4AM,
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
        data: chrt4AM_F,
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
    color: ['white', 'white', '#fd5454', '#d4d4d4', '#fd5454', '#d4d4d4'],
    tooltip: {
      show: false
    },
    legend: {
      data: [{
        name: '出血',
        icon: 'rect'
      }, {
        name: '正常',
        icon: 'rect'
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
        data: [22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
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
            if (value % 3 == 0)
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
        max: 1.2,
        min: -1.2,
        axisLabel: {
          formatter: function (value) {
            var texts = [];
            if (value > 0 && value < 1)
              texts.push('晚')
            else if (value < 0 && value > -1)
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
        data: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
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
        data: [-0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05],
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
        data: [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0],
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
        data: [0, 0, 0, 0, 0, -1, 0, -1, 0, 0, -1, -1, -1, 0, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, 0, -1],
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
      lazyLoad: true

    },
    ec2: {
      lazyLoad: true

    },
    ec3: {
      lazyLoad: true
    },
    ec4: {
      lazyLoad: true
    },
    ec5: {
      lazyLoad: true
    },
    tab1: 0,
    tab2: 0,
  },
  bindchangeTab1: function (e) {
    this.setData({
      tab1: e.detail.index
    });
    switch (e.detail.index) {
      case 0:
        console.log(this.ecComponent1);
        this.ecComponent1.init(initChart1);
        break;
      case 1:
        console.log(this.ecComponent2);

        this.ecComponent2.init(initChart2);
        break;
      case 2:
        console.log(this.ecComponent3);

        this.ecComponent3.init(initChart3);
        break;
    }

  },
  bindchangeTab2: function (e) {
    this.setData({
      tab2: e.detail.index
    });
    switch (e.detail.index) {
      case 0:
        this.ecComponent4.init(initChart4);
        break;
      case 1:
        this.ecComponent5.init(initChart5);
        break;

    }
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
    // mock数据
    // const query = new AV.Query('Mock');
    // query.get('60fb7cae34bfda01e0e83025').then((mockInfo) => {
    //   const tmp = mockInfo.get('toSet')
    //   calendar.setDateStyle(tmp)
    //   this.setData({
    //     toSet: tmp
    //   })
    // });
    calendar.setDateStyle(this.data.toSet)

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
  async whenChangeMonth(e) {
    let curYear = e.detail.next.year
    let curMonth = e.detail.next.month
    let queryDateString=""
    if(curMonth<10){
      queryDateString=curYear+"-0"+curMonth+"-"
    }
    else{
      queryDateString=curYear+"-"+curMonth+"-"
    }
    console.log(queryDateString)
    var toset = []
    const currentUser = AV.User.current();
    let username = currentUser.attributes.username
    const query = new AV.Query('BrushRecord')
    query.equalTo('username', username)
    query.contains('date',queryDateString)

    //await异步改同步
    let setRecords = await query.find().catch(e => {
      console.log(e);
    });
    console.log(setRecords);
    if (setRecords && setRecords.length) {
      toset.push(setRecords[0].attributes.date)
    }
    let i = 1
    let len = setRecords.length
    for (i = 1; i < len; i++) {
      if (toset.indexOf(setRecords[i].attributes.date) == -1) {
        toset.push(setRecords[i].attributes.date)
      }
    }
    console.log("日期")
    console.log(toset)
    len = toset.length
    let tosetData = []
    for (i = 0; i < len; i++) {
      const query2 = new AV.Query('BrushRecord')
      query2.equalTo('username', username)
      query2.equalTo('date', toset[i])
      const myDate = new Date(toset[i].replace(/-/g, "/"))
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let date = myDate.getDate();
      //异步改同步
      let count = await query2.count();
      if (count < 2 && count > 0) {
        tosetData.push({
          "year": year,
          "month": month,
          "date": date,
          "class": "normal-date",
        })
        this.setData({
          toSet: tosetData
        })
      }
      else {
        tosetData.push({
          "year": year,
          "month": month,
          "date": date,
          "class": "good-date",
        })
        this.setData({
          toSet: tosetData
        })
      }
    }
    console.log(tosetData)

    const calendar = this.selectComponent('#calendar').calendar
    //直接设置数据
    calendar.setDateStyle(this.data.toSet)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '日历',
    })
    wx.showLoading({
      title: '加载中',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.ecComponent1 = this.selectComponent('#mychart-dom-bar1');
    this.ecComponent2 = this.selectComponent('#mychart-dom-bar2');
    this.ecComponent3 = this.selectComponent('#mychart-dom-bar3');
    this.ecComponent4 = this.selectComponent('#mychart-dom-bar4');
    this.ecComponent5 = this.selectComponent('#mychart-dom-bar5');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    this.getTabBar().init();
    // mock数据
    // const query = new AV.Query('Mock');
    // query.get('60fb7cae34bfda01e0e83025').then((mockInfo) => {
    //   const tmp = mockInfo.get('toSet')
    //   calendar.setDateStyle(tmp)
    // });
    let d= new Date()
    let month=d.getMonth()+1
    let year=d.getFullYear()
    let queryDateString=""
    if(month<10){
      queryDateString=year+"-0"+month+"-"
    }
    else{
      queryDateString=year+"-"+month+"-"
    }
    
    var toset = []
    const currentUser = AV.User.current();
    let username = currentUser.attributes.username
    const query = new AV.Query('BrushRecord')
    query.equalTo('username', username)
    query.contains('date',queryDateString)

    //await异步改同步
    let setRecords = await query.find().catch(e => {
      console.log(e);
    });
    console.log(setRecords);
    if (setRecords && setRecords.length) {
      toset.push(setRecords[0].attributes.date)
    }
    let i = 1
    let len = setRecords.length
    for (i = 1; i < len; i++) {
      if (toset.indexOf(setRecords[i].attributes.date) == -1) {
        toset.push(setRecords[i].attributes.date)
      }
    }
    console.log("日期")
    console.log(toset)
    len = toset.length
    let tosetData = []
    for (i = 0; i < len; i++) {
      const query2 = new AV.Query('BrushRecord')
      query2.equalTo('username', username)
      query2.equalTo('date', toset[i])
      const myDate = new Date(toset[i].replace(/-/g, "/"))
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let date = myDate.getDate();
      //异步改同步
      let count = await query2.count();
      if (count < 2 && count > 0) {
        tosetData.push({
          "year": year,
          "month": month,
          "date": date,
          "class": "normal-date",
        })
        this.setData({
          toSet: tosetData
        })
      }
      else {
        tosetData.push({
          "year": year,
          "month": month,
          "date": date,
          "class": "good-date",
        })
        this.setData({
          toSet: tosetData
        })
      }
    }
    console.log(tosetData)

    const calendar = this.selectComponent('#calendar').calendar
    //直接设置数据
    calendar.setDateStyle(this.data.toSet)


    // -------------------------------------
    var now = new Date(); //当前日期 
    var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    if(nowDayOfWeek==0){
      nowDayOfWeek=7
    }
    var startTime = now.getTime() - ((nowDayOfWeek - 1) * 24 * 60 * 60 * 1000)
    var startDate = new Date()
    startDate.setTime(startTime);
    for (let i = 0; i < 7; i++) {
      const queryChart1AM = new AV.Query('BrushRecord')
      queryChart1AM.equalTo('username', username)
      var ye = startDate.getFullYear();
      var mo = (startDate.getMonth() + 1).toString().padStart(2, '0');
      var da = startDate.getDate().toString().padStart(2, '0');
      var formatDate = ye + '-' + mo + '-' + da;
      queryChart1AM.equalTo('date', formatDate)
      queryChart1AM.equalTo('day_or_night', "AM")
      let res = await queryChart1AM.first().catch(e => {
        console.log(e);
      });
      if (res) {
        console.log(res);
        chrt1AM.splice(i, 1, (res.attributes.t_total / 60).toFixed(2));
        chrt4AM.splice(i, 1, -res.attributes.gumBleed)
        chrt4AM_F.splice(i, 1, res.attributes.gumBleed - 1)
      }



      const queryChart1PM = new AV.Query('BrushRecord')
      queryChart1PM.equalTo('username', username)
      queryChart1PM.equalTo('date', formatDate)
      queryChart1PM.equalTo('day_or_night', "PM")

      let res2 = await queryChart1PM.first().catch(e => {
        console.log(e);
      });
      console.log(res2, i);
      if (res2) {
        chrt1PM.splice(i, 1, (res2.attributes.t_total / 60).toFixed(2));
        chrt4PM.splice(i, 1, res2.attributes.gumBleed)
        chrt4PM_F.splice(i, 1, 1 - res2.attributes.gumBleed)
      }



      var tmpTime = startDate.getTime() + (24 * 60 * 60 * 1000)
      startDate.setTime(tmpTime)
    }
    wx.hideLoading({
      success: (res) => { },
    })


    this.ecComponent1.init(initChart1);
    this.ecComponent4.init(initChart4);

  },

})