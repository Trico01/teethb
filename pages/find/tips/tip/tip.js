// pages/find/tips/tip/tip.js

Page({
  data: {
   index:0, 
   imgUrls:[
    'https://z3.ax1x.com/2021/07/22/W0Pviq.png',
    'https://z3.ax1x.com/2021/07/22/WwyRrq.png',
    'https://z3.ax1x.com/2021/07/22/WwyWq0.png',
    'https://z3.ax1x.com/2021/07/22/W0iPL4.png',
    'https://z3.ax1x.com/2021/07/22/W0iCyF.png',
   ]
  },
  onLoad: function(options){
    wx.setNavigationBarTitle({ title:'你知道吗'})
    this.setData({
      index: options.index,
    })
  }
})
