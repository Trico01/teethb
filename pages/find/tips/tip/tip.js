// pages/find/tips/tip/tip.js

Page({
  data: {
   index:0, 
   imgUrls:[
    '../../image/tip_1.png',
    '../../image/tip_2.png',
    '../../image/tip_3.png',
    '../../image/tip_4.png',
    '../../image/tip_5.png',
   ]
  },
  onLoad: function(options){
    this.setData({
      index: options.index,
    })
  }
})
