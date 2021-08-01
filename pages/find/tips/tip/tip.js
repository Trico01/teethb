// pages/find/tips/tip/tip.js

Page({
  data: {
   index:0, 
   imgUrls:[
    'https://z3.ax1x.com/2021/08/01/Wzu3Md.png',
    'https://z3.ax1x.com/2021/08/01/WzudJS.png',
    'https://z3.ax1x.com/2021/08/01/Wzu0zQ.png',
    'https://z3.ax1x.com/2021/08/01/WzusLn.png',
    'https://z3.ax1x.com/2021/08/01/WzuWJU.png',
   ]
  },
  onLoad: function(options){
    wx.setNavigationBarTitle({ title:'你知道吗'})
    this.setData({
      index: options.index,
    })
  },
})
