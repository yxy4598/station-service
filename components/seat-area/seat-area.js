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
        console.log(newVal, oldVal);
      }
    },
    titles: {
      type:String,
      observer: (newVal, oldVal) => {
        console.log(newVal, oldVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // seats: [],
    isScale: false
  },
  created: function() {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
