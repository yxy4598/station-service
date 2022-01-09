const App = getApp();

// pages/feature/feature.js
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    seats: [],
    toilet: [],
    activeKey: 0,
    isSeat: true,
    isToilet: false,
    winHeight: App.globalData.windowHeight-46,

    stationName: ""
  },
  handleCityEvent(e) {
    // console.log(e);
    e.detail.seats.map((item) => {
      item.chooseFlag = 0
    })
    this.setData({
      seats: e.detail.seats
    })
  },

  handleToiletEvent(e) {
    if(e.detail.toilet) {
      e.detail.toilet.map((item) => {
        item.chooseFlag = 1
      })
    }
    
    this.setData({
      toilet: e.detail.toilet,
      stationName: e.detail.stationName
    })
  },

  handleSeat() {
    this.setData({
      isSeat: true,
      isToilet: false,
    })

  },
  handleToilet() {
    this.setData({
      isToilet: true,
      isSeat: false
    })
  },
  onChange(event) {
    // Notify({ type: 'primary', message: event.detail });

    console.log(event);
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