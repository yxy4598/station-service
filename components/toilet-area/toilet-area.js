// components/toilet-area/toilet-area.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stationName: {
      type: String,
      observer: (newVal, oldVal) => {
        // console.log(newVal, oldVal);
      }
    },
    toilet: {
      type: Array,
      observer: (newVal, oldVal) => {
        // console.log(newVal, oldVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toiletTap(e) {
      let row = e.currentTarget.dataset.row;//行索引
      let col = e.currentTarget.dataset.col;//列索引
      let chooseFlag = e.currentTarget.dataset.chooseflag; //判断座位情况

      if(chooseFlag == 1) {
        this.properties.toilet.forEach(res => {
          if(res.rowX == row && res.rowY==col){
            res.chooseFlag = 1
          }
          return
        })
        wx.showModal({
          title: '温馨提示',
          content: '亲，'+row + '排'+ col + '座'+'没人哦',
          showCancel: false
        })
      }else if(chooseFlag == 2) {
        wx.showModal({
          title: '温馨提示',
          content: '亲，当前座位有人哦',
          showCancel: false
        })
      }
      this.setData({
        seats: this.properties.seats,
        scaleValue: 2,
        isScale: true
      })
    }
  }
})
