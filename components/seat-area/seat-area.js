// components/seat-area/seat-area.js
import xyRequest from "../../service/index"

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    seats: [],
    isScale: false
  },
  created: function() {
    xyRequest.get("/seat", { stationId: 1 }).then(res => {
      this.setData({
        seats: res.data.data
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
