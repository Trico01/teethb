# 前端code of conduct

> 由于本人也不是懂哥，这里只是粗略地写一下，欢迎补充

### 一、整体结构

* 本程序前端整体使用原生微信小程序架构
* 不使用云开发，使用服务器提供后端服务
* 小程序使用组件化（components）和模块化（models）开发



### 二、页面规范

#### WXML

* wxml尽量不要超过200行
* wxml中需要维持一定数量的注释（使用`<!--comment-->`创建注释
* 除优先级问题导致组件样式必须写到style内，其余css style尽量写到wxss中
* 尽量为每一个标签给class属性
* 过长的一行可以换行



#### WXSS

* 每个页面中的wxss尽量只包含该页面中出现的特殊样式，复用样式尽量写到app.wxss中
* wxss中需要维持一定数量的注释（使用`/* comment */`创建注释）
* 单位使用rpx，相关文档参考https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html，尽量不要使用px



#### JSON

* 在json中配置页面的一些相关参数，具体用法参考https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html



### 三、代码规范

1. 常量、变量和一般函数（非组件）使用小驼峰命名，例如

   ```ts
   let userId = 2333;
   const maxNameLength = 10;
   const getMax = (a: number, b: number): number => (a > b ? a : b);
   const [count, setCount] = useState(0);
   ```

   在取名时尽量使用有实际意义的单词全拼组合，比如

   `filePath, groupName`

   对于一些约定俗成的常见单词可以使用缩写，比如`imageSrc, sendMsg`

   变量定义最好使用`let`，而不是`var`

2. 大括号

   * 为了程序的可扩展性，即使代码块中只有一个语句，也请添加大括号

   * 左大括号不换行

   * 右大括号如果后面跟右小括号则右小括号不换行，否则换行

     ```ts
     https.on('data', (data) => {
        if(...) {
           ...
        }
        ...
     });
     ```

3. 引号

   字符串建议使用双引号`""`，当然用单引号也没啥毛病（

4. 分号

   众所周知，`js是一门需要分号结尾的语言`;

5. tab

   使用小程序编辑器中右键格式化即可

6. 逗号

   * 关于Trailing Comma（就是在最后一项后面跟着的~~多余的~~逗号`,`），如果不报错就可以随便用，这个无所谓

   * 对于参数列表来说，trailing comma建议不加
   * JSON **hates** trailing commas，不要在JSON中出现多余的逗号

7. 函数

   尽量使用命名function函数

   ~~~js
   function Log(e){
   	console.log(e)
   }
   ~~~

   而不是匿名函数

   ~~~js
   (e)=>{
   	console.log(e)
   }
   ~~~

   

#### WX API

- 使用wx api时需要处理好错误，如果需要使用toast或者弹窗的话，请参考下文的错误处理部分

- 使用同步方法（以Sync结尾）时，使用try catch结构

  ~~~js
  try {
  	wx.setStorageSync('key', 'value')
  } catch (e) {
  	console.error(e)
  }
  ~~~

  

### 四、全局变量

写到app.js的globalData中，目前用来存放多个页面中使用的变量



### 五、错误处理

调用微信API中的模态窗口反馈错误