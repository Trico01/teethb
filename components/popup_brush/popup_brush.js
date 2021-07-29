// components/popup_brush/popup_brush.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    highlight: [],
    brush: [0,0,0,0,0,0],//第一位表示防蛀，第二位多效，第三位清新，第四位美白，第五位抗敏感，第六位药用
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: 1,
        brush: [0,0,0,0,0,0]
      })
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: 0
      })

      var highlight = this.getParams('highlight');
      console.log(highlight);
      this.setData({
        highlight : highlight
      })

      this.choose_brush()
    },

    getParams: function (a) {
      return wx.getStorageSync(a)
    },

    //选择牙刷类型
    choose_brush() {
      var a=this.data.highlight
      if(a[0]==1 || a[1]==1 || a[3]==1){
        this.data.brush[0]=1
      }
      if(a[2]==1 || a[4]==1 || a[5]==1 || a[12]==1){
        this.data.brush[1]=1
      }
      if(a[9]==1 || a[11]==1){
        this.data.brush[2]=1
      }
      if(a[6]==1 || a[7]==1 || a[8]==1 || a[10]==1 || a[15]==1){
        this.data.brush[3]=1
      }
      if(a[13]==1){
        this.data.brush[4]=1
      }
      if(a[14]==1){
        this.data.brush[5]=1
      }
      this.setData({
        brush: this.data.brush
      })
      console.log(this.data.brush)
    },

    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error () {
      //触发取消回调
      this.triggerEvent("error")
    },

  }
})
