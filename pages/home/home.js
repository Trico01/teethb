// pages/home/home.js
var setTimer = null; //把时间函数变量设为全局

const AV = require("../../libs/av-core-min.js");
const adapters = require("../../libs/leancloud-adapters-weapp.js");

AV.setAdapters(adapters);
// 改为自己的，在leancloud控制台-设置-应用凭证中
AV.init({
  appId: "yelxhl0OPMa8AN0BOU5qndGU-gzGzoHsz",
  appKey: "FEy1FLbtbj4nP9rleSPtHq7j",
  serverURL: "https://yelxhl0o.lc-cn-n1-shared.com",
});

// 导入util.js来获取时间
var util = require("../../utils/util");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    popupFlag: 0, //0表示未弹出过， 1表示弹出过 同时未完成上传
    night_popup_flag: 0, // 晚上才会弹出食物询问，默认0不弹出
    lastTime: 0,

    start_flag: false, // 倒计时开始或暂停的flag，false为暂停
    timestamp: 0, // 倒计时的总共的秒数
    time: "", // 从timestamp转换成的‘xx：xx’格式的时间，用来显示在wxml页面

    brush_state: -1, // 表示刷牙的位置状态
    bursh_time: [26, 26, 32, 32, 32, 32], // 不同位置的刷牙时间
    // bursh_time: [5, 5, 5, 5, 5, 5], //测试用
    title_change: [1, 1, 1, 1, 1, 1], // 标题修改，1表示外侧，2表示咬合，3表示内侧，4表示远端
    brush_method: 0, // 刷牙具体方法提示

    change_order: [2, 3, 0, 1, 4, 5], //更改顺序
    method_array: [
      "颤动+拂刷",
      "大张口、垂直刷动",
      "大张口、颤动+拂刷",
      "大张口、由内到外刷",
      "牙颈部水平颤动",
      "托槽上部垂直于托槽、颤动",
      "咬合面侧水平颤动",
      "大张口、拂刷"
    ],

    //改变刷牙时间的参数
    hand: "0", // 惯用手，0右手，1左手
    zjType: 0, // 0~4:"无","唇侧金属托槽","唇侧陶瓷托槽","舌侧托槽","隐形矫正牙套"
    yagao: 0, // 0~8:"美白","清新","防蛀","固齿","抗敏感","护龈","竹盐","药用","多效"
    quchi: [0, 0, 0, 0, 0, 0], //龋齿状态，0表示无
    //个性化
    prsnl_2: false, // 自定义时间
    multiIndex: [2, 0], // 默认3:00

    prsnl_3: false, // 播放音乐  未使用
    prsnl_4: false, // 牙龈出血询问 未使用

    username: "", //唯一确定登录的用户
    current_time: "", // 刷牙时间
    seccess_record: 0, // 刷牙成功记录内容

    playedFlag: 0, //是否点击了开始
    brushType: [0,0] // 牙刷类型
  },

  onClickPlay: function () {
    //点击play按钮
    if (this.data.brush_state == -1) {
      //第一次点击
      this.setData({
        brush_state: this.data.change_order[0], //设置初始的time和timestamp

        timestamp: this.data.bursh_time[this.data.change_order[0]],
        time: "0:" + String(this.data.bursh_time[this.data.change_order[0]]),
      });
    }

    if (this.data.popupFlag == 0 && this.data.night_popup_flag == 1) {
      //需要弹出来弹框
      this.setData({
        popupFlag: 1,
      });
      //获得popup组件
      this.popup_food = this.selectComponent("#popup_food");
      this.popup_brush = this.selectComponent("#popup_brush");
      this.popup_food.showPopup();
    } else {
      //早上 or 第二次以上暂停并开始

      if (this.data.start_flag == true) return;
      this.setData({
        playedFlag: 1,
        start_flag: true, //把flag置为true
      });
      console.log("play");
      var that = this;
      this.createNewTimer().then((res) => {
        //完成 一次刷牙
        console.log("done");
        if (res) {
          that.success_record(true); //开始上传
          that.finish_upload(); //重置各种状态
        }
      });
    }
  },
  createNewTimer: function (interval = 1000) {
    return new Promise((resolve, reject) => {
      setTimer = setInterval(() => {
        if (this.data.timestamp <= 0) {
          let next_state = -1;
          //需要更新
          this.data.change_order.map((item, index) => {
            if (item == this.data.brush_state) {
              if (index + 1 < this.data.change_order.length) {
                next_state = this.data.change_order[index + 1];
              }
            }
          });
          if (next_state < 0) {
            //完事了
            resolve(true);
          } else {
            this.setData({
              brush_state: next_state,
              title_change: [1, 1, 1, 1, 1, 1],
              timestamp: this.data.bursh_time[next_state],
              time: "0:" + String(this.data.bursh_time[next_state]),
            });
          }
        } else {
          this.setData({
            //每隔一秒，时间戳-1，对应转化一次timestamp
            timestamp: this.data.timestamp - 1,
            time: this.time_change(this.data.timestamp - 1),
          });
          this.title_change_fun(); //根据时间修改刷牙标题
        }
      }, interval);
    });
  },
  onClickPause: function () {
    //点击pause按钮
    console.log("pause");
    this.setData({
      start_flag: false, //把flag置为false
    });
    //否则即为停止，清除全局变量的计时函数，实现时间的停止
    if (setTimer) {
      clearInterval(setTimer);
    }
  },

  onClickStop: function () {
    //点击stop按钮
    if (this.data.playedFlag) {
      console.log("stop");
      this.success_record(false); //开始记录
      this.finish_upload(); //重置各种状态
    }
  },

  onClickReset: function (e) {
    //点击reset按钮,重置并清除全局变量的计时函数
    if (this.data.playedFlag) {
      console.log("reset");
      //监测是否双击
      // 获取这次点击时间
      var thisTime = e.timeStamp;
      // 获取上次点击时间 默认为0
      var lastTime = this.data.lastTime;
      if (lastTime != 0) {
        if (thisTime - this.data.lastTime < 500)
          //发生了双击事件
          this.setData({
            brush_state: this.data.change_order[0],
          });
      }
      // 赋值
      this.setData({
        lastTime: thisTime,
        timestamp: this.data.bursh_time[this.data.brush_state],
        time: "0:" + String(this.data.bursh_time[this.data.brush_state]),
        brush_method: 0,
      });

      this.onClickPause();
      this.onClickPlay();
    }
  },

  finish_upload: function () {
    this.setData({
      brush_state: -1,
      start_flag: false,
      playedFlag: 0,
      brush_method: 0,
    });
    if (setTimer) {
      clearInterval(setTimer);
    }
    return;
  },
  time_change: function (timestamp) {
    //时间戳转化成‘xx:xx’的可读形式
    var timem = 0,
      times = 0;
    timem = parseInt(timestamp / 60);
    times = timestamp % 60 < 10 ? "0" + (timestamp % 60) : timestamp % 60;
    return timem + ":" + times;
  },

  // 刷牙成功数据上传
  success_record(success) {
    this.setData({
      popupFlag: 0,
      title_change: [1, 1, 1, 1, 1, 1],
    });
    this.getTabBar().init();
    const currentUser = AV.User.current();

    // 获取用户
    if (currentUser !== null) {
      this.setData({
        username: currentUser.attributes.username,
      });
    }

    // 获取现在时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var current_time = String(util.formatTime(new Date()));
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      current_time: current_time,
    });
    var date = current_time.substr(0, 10);
    var tt = current_time.substr(11);
    tt = tt.substr(0, tt.length - 3);
    var day_or_night = current_time.substr(
      current_time.length - 2,
      current_time.length
    ); // AM表示早上，PM表示晚上

    // 计算刷牙总时间(秒)
    var t_total = 0;
    if (success == 1) {
      for (let index = 0; index < this.data.bursh_time.length; index++) {
        const t = this.data.bursh_time[index];
        t_total = t_total + t;
      }
    } else {
      for (
        let index = 0;
        this.data.change_order[index] != this.data.brush_state;
        index++
      ) {
        const t = this.data.bursh_time[this.data.change_order[index]];
        t_total = t_total + t;
      }
      t_total =
        t_total +
        this.data.bursh_time[this.data.brush_state] -
        this.data.timestamp;
    }
    let tempUseTime=currentUser.attributes.brushUseTotal+t_total
    currentUser.set('brushUseTotal',tempUseTime)
    currentUser.save()
    this.setData({
      success_record: [
        this.data.username,
        date,
        tt,
        t_total,
        day_or_night,
        success,
      ],
    });

    const myRecord = new AV.Object("BrushRecord");
    myRecord.set("username", this.data.username);
    myRecord.set("date", date);
    myRecord.set("tt", tt);
    myRecord.set("t_total", t_total);
    myRecord.set("day_or_night", day_or_night);
    myRecord.set("success_flag", success ? 1 : 0);
    myRecord.set("gumBleed", 0);
    myRecord.save();
    wx.setStorageSync("success_record", this.data.success_record);

    wx.navigateTo({
      url: "./result/index",
    });
  },

  // 根据时间修改刷牙标题
  title_change_fun() {
    var t_ = this.data.timestamp;
    var t = this.data.bursh_time[this.data.brush_state] - t_; //t表示过了多长时间
    console.log("time is ", t);
    var t1 = 10,
      t2 = 14,
      t3 = 26; // 三个刷牙时间分割点，小于t1时为外侧，大于t1小于t2时为咬合，大于t2小于t3时为内侧，大于t3时为远端
    if(!(this.data.brushType[0]&&this.data.brushType[1])){
      t1 = t1 + 1;
      t2 = t2 + 1;
      t3 = t3 + 1;
    }
    // 先判断正畸，若无再判断龋齿
    if (this.data.zjType != 0) {
      // 正畸处理
      if (this.data.zjType == 1 || this.data.zjType == 2) {
        // 唇侧牙套，外侧、咬合和远端各加2秒
        t1 = t1 + 2;
        t2 = t2 + 4;
        t3 = t3 + 4;
      }
      if (this.data.zjType == 3) {
        // 舌侧牙套，内侧、咬合和远端各加2秒
        t2 = t2 + 2;
        t3 = t3 + 4;
      }

      // 当刷外侧牙时提示具体部位
    } else {
      // 龋齿处理
      if (this.data.quchi[this.data.brush_state]) {
        t1 = t1 + 2;
        t2 = t2 + 4;
        t3 = t3 + 6;
      }
    }
    if (this.data.brush_state == 0 || this.data.brush_state == 1) {
      //刷门牙时
      if (t <= t1) {
        this.data.title_change[this.data.brush_state] = 1;
        this.setData({
          brush_method: 0,
        });
      } else if (t > t2) {
        this.data.title_change[this.data.brush_state] = 3;
        this.setData({
          brush_method: 7,
        });
      } else {
        this.data.title_change[this.data.brush_state] = 2;
        this.setData({
          brush_method: 1,
        });
      }

      // 正畸时的特殊修改
      if (this.data.zjType == 1 || this.data.zjType == 2) {
        if (t > 0 && t <= 4) {
          this.setData({
            brush_method: 4,
          });
        }
        if (t > 4 && t <= 8) {
          this.setData({
            brush_method: 5,
          });
        }
        if (t > 8 && t <= 12) {
          this.setData({
            brush_method: 6,
          });
        }
      }
      if (this.data.zjType == 3) {
        if (t2 + t >= 0 && t2 + t <= 4) {
          this.setData({
            brush_method: 4,
          });
        }
        if (t2 + t > 4 && t2 + t <= 8) {
          this.setData({
            brush_method: 5,
          });
        }
        if (t2 + t > 8 && t2 + t <= 12) {
          this.setData({
            brush_method: 6,
          });
        }
      }
    } else {
      if (t <= t1) {
        this.data.title_change[this.data.brush_state] = 1;
        this.setData({
          brush_method: 0,
        });
      } else if (t > t1 && t <= t2 + 1) {
        this.data.title_change[this.data.brush_state] = 2;
        this.setData({
          brush_method: 1,
        });
      } else if (t > t2 + 1 && t <= t3 + 1) {
        this.data.title_change[this.data.brush_state] = 3;
        this.setData({
          brush_method: 2,
        });
      } else {
        this.data.title_change[this.data.brush_state] = 4;
        this.setData({
          brush_method: 3,
        });
      }

      // 正畸时的特殊修改
      if (this.data.zjType == 1 || this.data.zjType == 2) {
        if (t > 0 && t <= 4) {
          this.setData({
            brush_method: 4,
          });
        }
        if (t > 4 && t <= 8) {
          this.setData({
            brush_method: 5,
          });
        }
        if (t > 8 && t <= 12) {
          this.setData({
            brush_method: 6,
          });
        }
      }
      if (this.data.zjType == 3) {
        if (t2 + t > 0 && t2 + t <= 4) {
          this.setData({
            brush_method: 4,
          });
        }
        if (t2 + t > 4 && t2 + t <= 8) {
          this.setData({
            brush_method: 5,
          });
        }
        if (t2 + t > 8 && t2 + t <= 12) {
          this.setData({
            brush_method: 6,
          });
        }
      }
    }
    this.setData({
      title_change: this.data.title_change,
    });
    console.log(this.data.title_change);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  //修改刷牙时间
  change_time() {
    this.getTabBar().init();
    const currentUser = AV.User.current();
    if (currentUser !== null) {
      this.setData({
        // 读取云端数据
        hand: currentUser.attributes.hand,
        zjType: currentUser.attributes.zhengji,
        yagao: currentUser.attributes.pasteType,
        prsnl_2: currentUser.attributes.prsnl_2,
        prsnl_3: currentUser.attributes.prsnl_3,
        prsnl_4: currentUser.attributes.prsnl_4,
        multiIndex: currentUser.attributes.setTimeIndex,
        quchi: currentUser.attributes.quchi,
      });
    }

    // 先处理个性化需求
    this.setData({
      music_mode: this.data.prsnl_3, // 音乐播放模式设定
    });
    if (this.data.prsnl_2 == 1) {
      // 检验是否自定义时间，若自定义
      var aver_time = Math.ceil(
        ((this.data.multiIndex[0] + 1) * 60 + this.data.multiIndex[1] * 10) / 6
      ); // 平均每个阶段的刷牙时间（秒）
      this.setData({
        bursh_time: [
          aver_time,
          aver_time,
          aver_time,
          aver_time,
          aver_time,
          aver_time,
        ],
      });
      var t_t = 0;
      for (let index = 0; index < this.data.bursh_time.length; index++) {
        const t = this.data.bursh_time[index];
        t_t = t_t + t;
      }
      var min, sec;
      min = String(Math.floor(t_t / 60));
      sec = t_t % 60;
      if (sec < 10) {
        sec = "0" + String(sec);
      }
      this.setData({
        // time: '0:' + String(this.data.bursh_time[this.data.brush_state]) // 从timestamp转换成的‘xx：xx’格式的时间，用来显示在wxml页面
        time: min + ":" + sec,
      });

      return;
    }
    // 没有个性化则先初始化数据
    this.setData({
      bursh_time: [26, 26, 32, 32, 32, 32],
    });
    if(!(this.data.brushType[0]&&this.data.brushType[1])){
      this.setData({
        bursh_time: [27, 27, 33, 33, 33, 33],
      });
    }
    // 先判断是否有龋齿，若有则不判断正畸
    if (this.data.zjType != 0) {
      if (this.data.zjType == 1 || this.data.zjType == 2) {
        // 唇侧牙套，外侧、咬合和远端各加2秒
        for (let index = 0; index < this.data.bursh_time.length; index++) {
          this.data.bursh_time[index] = this.data.bursh_time[index] + 6;
        }
        this.setData({
          bursh_time: this.data.bursh_time,
        });
      }
      if (this.data.zjType == 3) {
        // 舌侧牙套，内侧、咬合和远端各加2秒
        for (let index = 0; index < this.data.bursh_time.length; index++) {
          this.data.bursh_time[index] = this.data.bursh_time[index] + 6;
        }
        this.setData({
          bursh_time: this.data.bursh_time,
        });
      }
    } else {
      // 龋齿处理，内外咬合各加2秒
      if (
        this.data.quchi[0] ||
        this.data.quchi[1] ||
        this.data.quchi[2] ||
        this.data.quchi[3] ||
        this.data.quchi[4] ||
        this.data.quchi[5]
      ) {
        for (let index = 0; index < this.data.quchi.length; index++) {
          const element = this.data.quchi[index];
          if (element) {
            this.data.bursh_time[index] = this.data.bursh_time[index] + 6;
          }
        }
        this.setData({
          bursh_time: this.data.bursh_time,
        });
        console.log(this.data.bursh_time);
      }
    }

    var t_t = 0;
    for (let index = 0; index < this.data.bursh_time.length; index++) {
      const t = this.data.bursh_time[index];
      t_t = t_t + t;
    }
    var min, sec;
    min = String(Math.floor(t_t / 60));
    sec = t_t % 60;
    if (sec < 10) {
      sec = "0" + String(sec);
    }
    this.setData({
      // time: '0:' + String(this.data.bursh_time[this.data.brush_state]) // 从timestamp转换成的‘xx：xx’格式的时间，用来显示在wxml页面
      time: min + ":" + sec,
    });
  },

  //取消事件
  _error() {
    this.popup_food.hidePopup();
    this.popup_brush.hidePopup();
  },
  //确认事件
  _success() {
    this.popup_food.hidePopup();
    this.popup_brush.showPopup();
  },
  //popup_brush组件点击之后
  onClickBeginBrucs() {
    this.popup_food.hidePopup();
    this.popup_brush.hidePopup();
    this.onClickPlay(); //自动开始
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
    // 获取上午或下午数据
    var current_time = String(util.formatTime(new Date()));
    var day_or_night = current_time.substr(
      current_time.length - 2,
      current_time.length
    ); // AM表示早上 PM表示晚上
    if (day_or_night == "PM") {
      this.setData({
        night_popup_flag: 1,
      });
    }
    if (!this.data.playedFlag) {
      this.setData({
        start_flag: false
      })
      const currentUser = AV.User.current();
      if (currentUser !== null) {
        const hand = currentUser.attributes.hand
        if (hand == 0) {
          this.setData({
            change_order: [4, 5, 0, 1, 2, 3],
          })
        }
        else {
          this.setData({
            change_order: [2, 3, 0, 1, 4, 5],
          })
        }
        this.setData({
          // 读取云端数据
          hand: currentUser.attributes.hand,
          zjType: currentUser.attributes.zhengji,
          yagao: currentUser.attributes.pasteType,
          prsnl_2: currentUser.attributes.prsnl_2,
          prsnl_3: currentUser.attributes.prsnl_3,
          prsnl_4: currentUser.attributes.prsnl_4,
          multiIndex: currentUser.attributes.setTimeIndex,
          quchi: currentUser.attributes.quchi,
          brushType: currentUser.attributes.brushType
        });
      }
    }
    //修改刷牙时间
    this.change_time();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
});
