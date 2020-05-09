微信小程序canvas分享海报
原作者：https://github.com/kuckboy1994/mp_canvas_drawer
一、使用
1、把 components 中的 canvasdrawer 拷贝到自己项目下
2、在使用页面（.json文件）注册组件


{
      "usingComponents": {
        "canvasdrawer": "/components/canvasdrawer/canvasdrawer"
      }
}
3、 页面 **.wxml 文件中加入如下代码
<canvasdrawer painting="{{painting}}" bind:getImage="eventGetImage" bind:myevent='change'/>
painting 是需要传入的 json。 getImage 方法是绘图完成之后的回调函数，change方法是改变蒙版遮罩状态的回调函数，在 event.detail 中返回绘制完成的图片地址。
二、API


对象结构一览
数据对象的第一层需要三个参数: width、height、mode、views。配置中所有的数字都是没有单位的。这就意味着 canvas 绘制的是一个比例图。具体显示的大小直接把返回的图片路径放置到 image 标签中即可。
mode 可选值有 same, 默认值为空，常规下尽量不要使用。
当前可以绘制3种类型的配置: image、text、rect。配置的属性基本上使用的都是 css 的驼峰名称，还是比较好理解的。

{
  width: 375,
  height: 555,
  views: [
    {
      type: 'image',
      url: 'url',
      top: 0,
      left: 0,
      width: 375,
      height: 555
    },
    {
      type: 'text',
      content: 'content',
      fontSize: 16,
      color: '#402D16',
      textAlign: 'left',
      top: 33,
      left: 96,
      bolder: true
    },
    {
      type: 'rect',
      background: 'color',
      top: 0,
      left: 0,
      width: 375,
      height: 555
    }
  ]
}
image（图片）
属性
含义
默认值
可选值
url
绘制的图片地址，可以是本地图片，如：/images/1.jpeg


top
左上角距离画板顶部的距离


left
左上角距离画板左侧的距离


width
要画多宽
0

height
要画多高
0
text（文本）
属性
含义
默认值
可选值
content
绘制文本
''（空字符串）

color
颜色
black

fontSize
字体大小
16

textAlign
文字对齐方式
left
center、right
lineHeight
行高，只有在多行文本中才有用
20

top
文本左上角距离画板顶部的距离
0

left
文本左上角距离画板左侧的距离
0

breakWord
是否需要换行
false
true
MaxLineNumber
最大行数，只有设置 breakWord: true ，当前属性才有效，超出行数内容的显示为...
2

width
和 MaxLineNumber 属性配套使用，width 就是达到换行的宽度


bolder
是否加粗
false
true
textDecoration
显示中划线、下划线效果
none
underline（下划线）、line-through（中划线）rect (矩形，线条)
属性
含义
默认值
可选值
background
背景颜色
black

top
左上角距离画板顶部的距离


left
左上角距离画板左侧的距离


width
要画多宽
0

height
要画多高
0
Q&A
	1. 
最佳实践
绘制操作的时候最好 锁住屏幕 ，例如在点击绘制的时候


wx.showLoading({
title: '绘制分享图片中',
mask: true
})
绘制完成之后

wx.hideLoading()
	2. 
由于 canvasdrawer 不主动呈现绘制内容，而是交给调用者去使用 image 来展示，所以在mpvue更新数据就会render整个组件的，之后 canvasdrawer 又会重新被渲染，导致无限循环，所以默认情况下我把代码改为，传入的 painting 和之前的一样的话，组件就不渲染了。只有出现差异的内容才会更新（触发回调），这种个人认为还是可以接受的。 增加顶层参数 mode, mode: 'same' 为可以绘制同样的内容。
	3. 
二维码和小程序码如何绘制？

		* 
二维码和小程序码可以通过调用微信官方的接口产生，需要后端配合。
		* 
然后走 type: image 类型进行绘制即可。
	4. 
绘制流程相关

		* 
views 数组中的顺序代表绘画的先后顺序，会有覆盖的现象。请各位使用者注意。
	5. 
如何实现圆形头像？

		* 
由于完成一些效果，例如： 文字下划线 等。必须要使用微信小程序 rect 相关的接口，和 clip 接口感觉相处的不好（存在bug）。可以查看 微信小程序社区的帖子。
		* 
so，提供一种解决方式：使用一张中间镂空的图片盖在头像上。


