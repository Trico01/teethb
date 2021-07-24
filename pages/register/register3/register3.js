// pages/register/register3/register3.js
const AV = require('../../../libs/av-core-min.js');
const adapters = require('../../../libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
// 改为自己的，在leancloud控制台-设置-应用凭证中
AV.init({
  appId: "yelxhl0OPMa8AN0BOU5qndGU-gzGzoHsz",
  appKey: "FEy1FLbtbj4nP9rleSPtHq7j",
  serverURL: "https://yelxhl0o.lc-cn-n1-shared.com"
});

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  getUserProfile(e) {
    // 弹窗授权
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        app.globalData.signedIn=true
        var nickName=res.userInfo.nickName
        var avatarUrl=res.userInfo.avatarUrl
        this.setData({
          hasUserInfo: true
        })
        //leancloud一键登录，并导入授权获得的头像、昵称信息
        AV.User.loginWithMiniApp().then(user => { // user即为数据表中的一行（实例）
          console.log(user)
          user.set('nickName',nickName) // 更改实例属性的值，若不存在该属性，则添加
          user.set('avatarUrl',avatarUrl)
          user.set('birth',"2001-07-25")
          user.set('hand','0')
          user.set('quchi',[0,0,0,0,0,0])
          user.set('zhengji',0)
          user.set('brushType',[0,0])
          user.set('brushReminder',false)
          user.set('pasteType',0)
          user.set('prsnl_1',false)
          user.set('prsnl_2',false)
          user.set('prsnl_3',false)
          user.set('prsnl_4',false)
          user.set('useDate','')
          user.set('dueDate','')
          user.set('setTimeIndex',[2,0])
          user.set('useTimeIndex',0)
          user.save() // 别忘了save
        }).catch(console.error);
        wx.switchTab({
          url: '../../home/home',
        })
      }
    })
  },

  bindtapEnter:function(e){
    wx.switchTab({
      url: '../../home/home',
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

  },
  toNext(){
    let content = this.data.name
    if(content ==''){
      wx.showToast({
        title: '名字不能为空哦',
        icon: 'none',
      })
    }else{
      wx.redirectTo({
        url: '../register4/register4',
      })
    }
  },
  inputName(e){
    this.setData({
      name: e.detail.value,
    })
  }
})