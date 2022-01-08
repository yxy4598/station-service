// components/seat-area/seat-area.js
import xyRequest from "../../service/index"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    seats: {
      type: Array,
      value: [{id: 1}],
      observer: (newVal, oldVal) => {
        // console.log(newVal, oldVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // seats: [],
    isScale: false,
    scaleValue: 1,
    height: 0
  },
  created: function() {
    this.getHeight();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSeatScale(e) {
      // console.log(e);

      let scaleNum = e.detail.scale;
        //console.log(scaleNum)
        if (scaleNum == 1) {
            this.setData({
              isScale: false
            })
        }
        if (scaleNum == 2) {
            this.setData({
              isScale: true
            })
        }
    },
    handleSeatChange(e) {
// 没太有用

      // console.log(e);

    },
    seatTap(e) {
      let row = e.currentTarget.dataset.row;//行索引
      let col = e.currentTarget.dataset.col;//列索引
      let chooseFlag = e.currentTarget.dataset.chooseflag; //判断座位情况

      if(chooseFlag == 0) {
        this.properties.seats.forEach(res => {
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
      }else if(chooseFlag == 1) {
        this.properties.seats.forEach(res => {
          if(res.rowX == row && res.rowY==col){
            res.chooseFlag = 0
          }
          return
        })
      }
      this.setData({
        seats: this.properties.seats,
        scaleValue: 2,
        isScale: true
      })
    },
    getHeight() {
      // let that = this;
      //   var query = wx.createSelectorQuery();
      //   query.select('.box').boundingClientRect()
      //   query.exec(function (res) {
      //       let height = res[0].height
      //       that.setData({
      //           height: height
      //       })
      //   })

        // console.log(this.data.height);
    }
  }
})
