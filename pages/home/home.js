// pages/home/home.js
import xyRequest from "../../service/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seats: [],
    isScale: false
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    xyRequest.get("/seat", { stationId: 1 }).then(res => {
      this.setData({
        seats: res.data.data
      })
    })


    // wx.getLocation({
    //   altitude: 'true',
    //   isHighAccuracy: 'true',
    //   success: res => {
    //     console.log(res);
    //     wx.request({
    //       url: 'http://nint.ltd:8531/station/search',
    //       data: {
    //         longitude: res.longitude,
    //         latitude: res.latitude,
    //         num: 2
    //       },
    //       success: res => {
    //         console.log(res);
    //       }
    //     })
    //   }
    // })


  }
})