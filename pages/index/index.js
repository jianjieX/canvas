//index.js

Page({
  data: {
    painting: {},
    shareImage: '',
    shareMask:false,
    rpx:''
  },
  onLoad () {
    // this.eventDraw()
  },
  onShow(){
      //获取设备宽度
      var that=this;
      wx.getSystemInfo({
        success: function(res) {
          var rpx= res.windowWidth/375;
          that.setData({
            rpx:rpx
          })
        },
      })
  },
change(e){
  this.setData({
    shareMask:e.detail.shareMask
  })
},
eventClose(){
  this.setData({
    shareMask:false
  })
},
  //海报预览图
eventPreview(){
  var wximg = this.data.shareImage;
  wx.previewImage({
    current: wximg,
    urls: [wximg]
  })
},
  eventDraw () {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    let rpx=this.data.rpx; //设备比率
    this.setData({
      painting: {
        width: 528*rpx,
        height: 752*rpx,
        clear: true,
        views: [
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',//商品图
            top: 0,
            left: 0,
            width: 528*rpx,
            height: 528*rpx
          },
          {
            type: 'rect',
            background: '#fff',
            top: 528*rpx,
            left: 0,
            width: 528*rpx,
            height: 224*rpx
          },
          {
            type: 'text',
            content: '我还是从前那个少年，没有一丝丝改变。我还是从前那个少年，没有一丝丝改变。我还是从前那个少年，没有一丝丝改变。我还是从前那个少年，没有一丝丝改变。',
            fontSize: 20*rpx,
            lineHeight: 34*rpx,
            color: '#333',
            textAlign: 'left',
            top: 539*rpx,
            left: 16*rpx,
            width: 480*rpx,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          {
            type: 'text',
            content: '特权价￥',
            fontSize: 20*rpx,
            lineHeight: 44*rpx,
            color: '#F52340',
            textAlign: 'left',
            top: 610*rpx,
            left: 16*rpx,
            width: 82*rpx,
          },
          {
            type: 'text',
            content:'66.00',
            fontSize: 32*rpx,
            lineHeight: 44*rpx,
            color: '#F52340',
            textAlign: 'left',
            top: 602*rpx,
            left: 100*rpx,
            bolder: true
          },
          {
            type: 'text',
            content:'售价￥',
            fontSize: 20*rpx,
            lineHeight: 28*rpx,
            color: '#999',
            textAlign: 'left',
            top: 644*rpx,
            left: 16*rpx
          },
          {
            type: 'text',
            content:'99.00',
            fontSize: 20*rpx,
            lineHeight: 28*rpx,
            color: '#999',
            textAlign: 'left',
            top: 644*rpx,
            left: 78*rpx,
            textDecoration:'line-through'
          },
          {
            type: 'image',
            url: '../../images/atavurl.jpg',
            top: 684*rpx,
            left: 16*rpx,
            width: 52*rpx,
            height: 52*rpx
          },
          {
            type: 'image',
            url: '../../images/hollow.png',
            top: 684*rpx,
            left: 16*rpx,
            width: 52*rpx,
            height: 52*rpx
          },
          {
            type: 'text',
            content:'叫我狐歌啊',
            fontSize: 20*rpx,
            lineHeight: 28*rpx,
            color: '#666',
            textAlign: 'left',
            top: 686*rpx,
            left: 76*rpx,
            bolder:true
          },
          {
            type: 'text',
            content:'邀请好友享受内部优惠价',
            fontSize: 16*rpx,
            lineHeight: 22*rpx,
            color: '#666',
            textAlign: 'left',
            top: 714*rpx,
            left: 76*rpx
          },
          {
            type: 'image',
            url:'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg', //小程序码，需要后台配合返回
            top: 618*rpx,
            left: 404*rpx,
            width: 90*rpx,
            height: 90*rpx
          },
          {
            type: 'text',
            content:'长按识别',
            fontSize: 16*rpx,
            lineHeight: 22*rpx,
            color: '#999',
            textAlign: 'left',
            top: 714*rpx,
            left: 418*rpx
          },
        ]
      }
    })
  },
  eventSave () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success (res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
  })
  },
  eventGetImage (event) {
    console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
  }
})
