// pages/home/home.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nbTitle: '新标题',
      nbLoading: true,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })

    wx.getLocation({
      altitude: 'true',
      isHighAccuracy: 'true',
      success: res => {
        console.log(res);
        wx.request({
          url: 'https://nint.ltd/api/station/lal',
          data: {
            longitude: res.longitude,
            latitude: res.latitude,
            num: 2
          },
          success: res => {
            console.log(res);
          }
        })
      }
    })


  }
})