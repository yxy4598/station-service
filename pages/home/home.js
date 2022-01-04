// pages/home/home.js
import xyRequest from "../../service/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: [],
    option2: [
      { text: '曲阜市', value: 'a' },
      { text: '泰安市', value: 'b' },
      { text: '济南市', value: 'c' },
    ],
    option3: [
      { text: '曲阜东站', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    option3: [
      { text: '曲阜东站', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    option4: [
      { text: '待选择' , value: '0'},
      { text: '检票口1', value: '1'},
      { text: '检票口2', value: '2'},
    ],
    key1: 110000,
    value2: 'a',
    value3: 'a',
    value4: '0',
    seats: [],
    isScale: false
  },
  handleProvince(options) {
    console.log(options.detail);
    console.log(options);
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

    xyRequest.get("/region/province").then(res => {
      const data = res.data.data;
      let provinces = data.map((item, index) => {
        return Object.assign({}, {'text': item.name, value: item.code})
      })
      this.setData({
        province: provinces
      })
      console.log(provinces);
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