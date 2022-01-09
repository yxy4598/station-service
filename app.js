// app.js
App({
  globalData: {
    windowHeight: ''
  },
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        //导航高度
        
        this.globalData.windowHeight = res.windowHeight-res.statusBarHeight;
        console.log(this.globalData.windowHeight);
        console.log(res.screenHeight);
      }, fail(err) {
        console.log(err);
      }
    })
  }
})
