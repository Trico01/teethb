const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dev_pos: "back",
    camFlag: 0,
    co1: "#ffffff",
    bco1: "#ff9999",
    co2: "#ff9999",
    bco2: "#ffffff",
    co4: "#ffffff",
    bco4: "#ff9999",
    co5: "#ffffff",
    bco5: "#ff9999",
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度
  },

  start_cam: function () {
    this.setData({
      camFlag: 1
    })
  },

  change_cam() {
    if (this.data.camFlag == 1) {

      if (this.data.dev_pos == "back") {
        this.setData({
          dev_pos: "front",
        })
      } else {
        this.setData({
          dev_pos: "back",
        })
      }
      console.log(this.data)
    }
  },

  takePhoto() {
    if (this.data.camFlag != 2) {

      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath,
            camFlag: 2
          })
        }
      })

    } else {
      var that = this;
      wx.showModal({
        title: "确定拍摄？",
        cancelColor: '#666666',
        showCancel: true,
        cancelText: '重拍',
        confirmText: '确定',
        confirmColor: that.data.theme_color,
        success(res) {

          if (res.confirm) {

            //提交后执行的函数
            wx.navigateTo({
              url: '../bonus3/bonus3',
            })
          }else{
            that.setData({
              camFlag: 1
            })
          }


        }
      })
    }

  },
  error(e) {
    console.log(e.detail)
  },





  bindtapComplete: function(e){
    wx.navigateTo({
      url: '/pages/children/level3/bonus3/bonus3', // 页面跳转至该url 这个跳转过去是有返回箭头的那种（我也说不清
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
