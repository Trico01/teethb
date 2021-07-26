
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    flag: true,

    foodList:[
      { url: "https://z3.ax1x.com/2021/07/23/WyaLmq.png", name: '巧克力',id:"0"},
      { url: "https://z3.ax1x.com/2021/07/23/WyazhF.png", name: '糖果',id:"1"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaW0P.png", name: '饼干',id:"2"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaIfg.png", name: '甜品',id:"3"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaRmt.png", name: '汉堡',id:"4"},
      { url: "https://z3.ax1x.com/2021/07/23/WyavkT.png", name: '薯片' ,id:"5"},
      { url: "https://z3.ax1x.com/2021/07/23/WyabXn.png", name: '汽水',id:"6"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaX7V.png", name: '奶茶',id:"7"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaH6s.png", name: '牛奶',id:"8"},
      { url: "https://z3.ax1x.com/2021/07/23/WyafTf.png", name: '烧烤',id:"9"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaTpQ.png", name: '口香糖',id:"10"},
      { url: "https://z3.ax1x.com/2021/07/23/Wya4k8.png", name: '火锅',id:"11"},
      { url: "https://z3.ax1x.com/2021/07/23/Wya7lj.png", name: '面包' ,id:"12"},
      { url: "https://z3.ax1x.com/2021/07/23/Wya5tS.png", name: '冰淇凌',id:"13"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaxtU.png", name: '水果',id:"14"},
      { url: "https://z3.ax1x.com/2021/07/23/WyaO00.png", name: '沙拉',id:"15"},
    ],
    selected:[],
    highlight:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: 1
      })
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: 0
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error () {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success () {
      var index = this.data.highlight
      if (index.indexOf(true)==-1) {
        this.triggerEvent("error")
      }
      else{
      //触发成功回调
      wx.setStorageSync('highlight', this.data.highlight)
      this.triggerEvent("success");
      }
    },

    bindtapfood(e) {
      this.setData({
        selected: !this.data.highlight[e.currentTarget.dataset.id],
      })  
      this.data.highlight[e.currentTarget.dataset.id] = this.data.selected,  
      console.log(this.data.highlight)
      this.setData({
        highlight: this.data.highlight
      })
    },

    reset() {
      this.setData({
        highlight:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        selected: []
      })
      console.log(this.data.highlight)
    },
  }
})
