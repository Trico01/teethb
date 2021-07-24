// pages/more/more.js


const AV = require('../../libs/av-core-min.js');
const adapters = require('../../libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
// 改为自己的，在leancloud控制台-设置-应用凭证中
AV.init({
  appId: "yelxhl0OPMa8AN0BOU5qndGU-gzGzoHsz",
  appKey: "FEy1FLbtbj4nP9rleSPtHq7j",
  serverURL: "https://yelxhl0o.lc-cn-n1-shared.com"
});


Page({
  data: {
    avatarUrl:'',
    nickName:'',
    birth: '', // 用户生日 "YYYY-MM-DD"
    hand:'0', // 惯用手，0右手，1左手
    handOption:["右手","左手"],
    prsnl_1: false, // 个性化
    prsnl_3: false,
    prsnl_4: false,
    yagao: 0,
    yagaoList:["美白","清新","防蛀","固齿","抗敏感","护龈","竹盐","药用","多效"], // 和more_paste的同名列表是相同的，后续可删减
    today:'', // 当前日期
    zjType:0,
    zhengjiList:["无","唇侧金属托槽","唇侧陶瓷托槽","舌侧托槽","隐形矫正牙套"],
  },

  bindBirthChange(e){
    this.setData({
      birth: e.detail.value
    })
    const currentUser = AV.User.current();
    currentUser.set('birth',e.detail.value)
    currentUser.save()
  },
  bindHandChange(e){
    this.setData({
      hand: e.detail.value      
    })
    const currentUser = AV.User.current();
    currentUser.set('hand',e.detail.value)
    currentUser.save()
  },
  bindPrsnlChange1(e){
    this.setData({
      prsnl_1: e.detail.value
    })
    const currentUser = AV.User.current();
    currentUser.set('prsnl_1',e.detail.value)
    currentUser.save()
  },

  bindPrsnlChange3(e){
    this.setData({
      prsnl_3: e.detail.value
    })
    const currentUser = AV.User.current();
    currentUser.set('prsnl_3',e.detail.value)
    currentUser.save()
  },
  bindPrsnlChange4(e){
    this.setData({
      prsnl_4: e.detail.value
    })
    const currentUser = AV.User.current();
    currentUser.set('prsnl_4',e.detail.value)
    currentUser.save()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title:'我的'})
    var d = new Date()
    var tempString=d.toLocaleDateString().replace(/\//g,"-")
    this.setData({
      today: tempString
    })
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
    this.getTabBar().init();
    const currentUser = AV.User.current();
    // console.log(currentUser)
    this.setData({
      avatarUrl:currentUser.attributes.avatarUrl,
      nickName:currentUser.attributes.nickName,
      birth:currentUser.attributes.birth,
      hand:currentUser.attributes.hand,
      zjType:currentUser.attributes.zhengji,
      yagao:currentUser.attributes.pasteType,
      prsnl_1:currentUser.attributes.prsnl_1,
      prsnl_3:currentUser.attributes.prsnl_3,
      prsnl_4:currentUser.attributes.prsnl_4,
    })
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