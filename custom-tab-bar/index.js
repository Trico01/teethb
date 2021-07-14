Component({
  data: {
    active: 0,
    tabBarItemList: [
      {
        text: "首页",
        url: "/pages/home/home"
      },
      {
        text: "日历",
        url: "/pages/cal/cal"
      },
      {
        text: "发现",
        url: "/pages/find/find"
      },
      {
        text: "我的",
        url: "/pages/more/more"
      }
    ]
  },
  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      console.log(this.data.tabBarItemList[event.detail].url);
      wx.switchTab({
        url: this.data.tabBarItemList[event.detail].url
      });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.tabBarItemList.findIndex(
          (item) => item.url === `/${page.route}`
        )
      });
    },
  }
})