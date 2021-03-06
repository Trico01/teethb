# readme

### 简介

<img src="https://z3.ax1x.com/2021/08/01/WzQoLj.jpg" alt="QRcode" style="zoom: 80%;" />

**刷牙时间**是生医19级医学方向生产实习课程的作品，致力于成为维空间最好的刷牙辅助小程序，提供更好的个性化的口腔护理方案。于2021年8月1日发布1.0.1版本。



### 开发亮点

**刷牙时间小程序设计宗旨：简洁、实用、个性化。**

秉承这样的宗旨，在配色选择上我们使用了代表青春活力的蓝色作为我们的主色调，配合灰色作为打底色，既符合我们简洁美观的宗旨，又不显得过于单调乏味，同时还契合了用户的快速定位消息的需求。

**在第三方组件库的选择上，**我们选择了Vant组件库。vant是有赞前端团队开源的移动端组件库，于 2016 年开源，已持续维护 4 年时间。我们通过使用较为统一的样式进行设计，不仅大大加快了开发进度，同时也能更好的贴合用户的使用习惯与审美风格。

除此之外，我们还引入了小历同学、Echarts等第三方组件，以更好的满足小程序功能的实现。

<img src="https://z3.ax1x.com/2021/08/10/fYavvt.png" style="zoom: 67%;" />

**在图片存储上，**为了较好的满足图床需求，我们使用了阿里云提供的oss静态存储服务，oss是一种海量、安全、低成本、高可靠的云存储服务；同时绑定了自定义域名，使得整体的图片URL统一直观；为了给用户更好的使用体验，我们又使用了阿里云提供的cdn服务。用户直接访问OSS资源，访问速度会受到OSS的下行带宽以及Bucket地域的限制。如果通过CDN来访问OSS资源，带宽上限更高，并且可以将OSS的资源缓存至就近的CDN节点，通过CDN节点进行分发，访问速度会快得多，大大提高了用户的使用观感和体验。

<img src="https://z3.ax1x.com/2021/08/10/fYdSDf.png" style="zoom: 67%;" />

**在字体和图标的选择上，**我们认为系统自带的若干字体已经基本足够整体效果的呈现，不需要额外引入新的字体，个别特殊字体在[iconfont.cn](https://www.iconfont.cn/)上进行在线转换。图标主要使用vant-icon和矢量图标平台[iconfont.cn](https://www.iconfont.cn/)上的SVG矢量图，通过fontclass方式引用，大大降低了打包后整体的大小，也让用户整体的体验更加统一。

<img src="https://z3.ax1x.com/2021/08/10/fYdpb8.png" style="zoom: 50%;" />

**在后端和数据存储上，**我们选择了LeanCloud为小程序提供一站式后端云服务，免去服务器维护、证书配置等繁琐的工作，大幅降低开发和运维成本。用户系统中，使用其一键登录功能，快捷地使用微信用户身份登录。

<img src="https://z3.ax1x.com/2021/08/10/fYazKP.png" style="zoom: 67%;" />



### 交互设计与功能实现

#### 1. 标准刷牙

+ 标准的3分钟刷牙时间。
+ 不同部位的刷牙时间：两处门牙各26秒，四处侧牙各32秒，共180秒。
+ 不同的刷牙角度：内侧面、外侧面、咬合面、远端面。
+ 不同角度的刷牙方法：颤动+拂刷、大张口+垂直刷动等。

#### 2. 正畸和龋齿的个性化自定义

+ 在个人信息处选择正畸类型：唇侧金属托槽、唇侧陶瓷托槽等。
+ 在个人信息处选择龋齿范围。
+ 自动地延长刷牙时间。
+ 牙套清洁的注意事项提醒。

#### 3. 特殊饮食的询问和牙膏类型的推荐

+ 晚上刷牙前会进行特殊饮食询问。
+ 根据特殊饮食的摄入组合会推荐相应的牙膏。

#### 4. 其他自定义功能和设置

+ 牙膏类型的选择，帮助我们推荐牙膏类型。
+ 牙刷刷头类型的选择，配合不同的刷牙力度和时间。
+ 常用手的选择，左右手的选择来改变刷牙顺序。
+ 牙龈出血询问开关，帮助我们记录和提醒牙龈出血状况。
+ 完全基于自己选择的自定义时间。

#### 5. 儿童模式

+ 培养儿童刷牙习惯，提供儿童刷牙指导。
+ 无需安装插件，入口简单，操作方便。
+ 界面设计儿童向、卡通化，吸引儿童。
+ 易懂的卡通动画教程和闯关模式设定，为儿童量身定制。



### 数据记录和信息推送

#### 1. 数据的记录保存以及个性化提示

+ 成功刷牙会保存刷牙数据，方便用户查看刷牙记录。
+ 基于刷牙打卡记录的成就勋章鼓励用户刷牙。
+ 牙龈出血的询问和提醒。
+ 正畸牙套和龋齿的清洁护理提醒。
+ 自定义刷头更换提醒。

#### 2. 牙具和牙齿健康相关信息推送

+ 牙具种草。
+ 口腔护理知识。

#### 3. 基于刷牙数据的朋友圈刷牙排行榜

+ 基于连续打卡天数的排行榜。
+ 基于累计刷牙次数的排行榜。
+ 基于连续达标天数的排行榜。



### 产品优势

|                          | Oral-B           | 爱牙精灵         | Teeth Brushing | 刷牙时间       |
| ------------------------ | ---------------- | ---------------- | -------------- | -------------- |
| 是否有刷牙过程指导       | 连接电动牙刷后有 | 连接智能硬件后有 | 有             | __有__         |
| 是否需连接智能设备       | 需要连接电动牙刷 | 需要连接智能硬件 | 不需要         | __不需要__     |
| 是否有个性化定制刷牙方案 | 有较详细方案     | 基本无           | 基本无         | __有详细方案__ |
| 是否有口腔健康知识科普   | 无               | 有               | 无             | __有__         |



### 问题反馈

若有任何建议意见，欢迎通过邮箱2970027212@qq.com大力戳Trico。