// components/region-navbar.js

import xyRequest from "../../service/index"
import {
  uniqueFunc,
  selectPartition,
  selectTitle
} from "../../utils/tools"
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
    province: [],
    city: [],
    station: [],
    partition: [],
    value1: '',
    value2: '',
    value3: '',
    value4: '',

    seats: []
  },

  
  created: function() {
    //省份请求
    xyRequest.get("/region/province").then(res => {
      const data = res.data.data;
      let provinces = data.map((item, index) => {
        return Object.assign({}, {'text': item.name, value: item.id})
      })
      this.setData({
        province: provinces,
        value1: provinces[14].value
      })
      //城市请求
      xyRequest.get("/region/city",
      {
        provinceId: this.data.value1
      }
    ).then((res) => {
        const data = res.data.data;
        let cities = data.map((item, index) => {
          return Object.assign({}, {'text': item.name, value: item.id})
        })

        this.setData({
          city: cities,
          value2: cities[0].value
        })
        //高铁站请求
        xyRequest.get("/station/region/" + this.data.value2,
        ).then(res=>{
          const data = res.data.data;
          let stations = data.map((item, index) => {
            return Object.assign({}, {'text': item.name, value: item.id})
          })
          this.setData({
            station: stations,
            value3: stations[0].value
          })
          //座位分区请求
          xyRequest.get("/seat",
            {stationId: this.data.value3}
          ).then(res => {
            const data = res.data.data;
            if(data.length) {
              let items = uniqueFunc(data, "district");
              let partitions = items.map((item, index) => {
                return Object.assign({}, {'text': item.district, value: item.id})
              })
              
              this.setData({
                partition: partitions,
                value4: partitions[0].value,

                //存放座位
              })
            }else {
              this.setData({
                partition: {text: '待填充', value: 0},
                value4: 0
              })
            }
            
          })

        })
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleProvince(options) {
      xyRequest.get("/region/city",
      {
        provinceId: options.detail
      }
    ).then((res) => {
        const data = res.data.data;
        let cities = data.map((item, index) => {
          return Object.assign({}, {'text': item.name, value: item.id})
        })

        this.setData({
          city: cities,
          value2: cities[0].value
        })
        xyRequest.get("/station/region/" + this.data.value2,
        ).then(res=>{
          const data = res.data.data;
          let stations = data.map((item, index) => {
            return Object.assign({}, {'text': item.name, value: item.id})
          })
          this.setData({
            station: stations,
            value3: stations[0].value
          })

          xyRequest.get("/seat",
            {stationId: this.data.value3}
          ).then(res => {
            const data = res.data.data;
            if(data.length) {
              let items = uniqueFunc(data, "district");
              let partitions = items.map((item, index) => {
                return Object.assign({}, {'text': item.district, value: item.id})
              })

              
              this.setData({
                partition: partitions,
                value4: partitions[0].value
              })
            }else {
              this.setData({
                partition: {text: '待填充', value: 0},
                value4: 0
              })
            }
          })
        })
      })
    },
    handleCity(options) {
      xyRequest.get("/station/region/" + options.detail,
        ).then(res=>{
          const data = res.data.data;
          let stations = data.map((item, index) => {
            return Object.assign({}, {'text': item.name, value: item.id})
          })
          this.setData({
            station: stations,
            value3: stations[0].value
          })

          xyRequest.get("/seat",
            {stationId: this.data.value3}
          ).then(res => {
            const data = res.data.data;
            if(data.length) {
              let items = uniqueFunc(data, "district");
              let partitions = items.map((item, index) => {
                return Object.assign({}, {'text': item.district, value: item.id})
              })
              let seats = selectPartition(data, items[0].district)
              this.setData({
                partition: partitions,
                value4: partitions[0].value
              })
              this.triggerEvent('cityEvent', {seats: seats})
            }else {
              this.setData({
                partition: {text: '待填充', value: 0},
                value4: 0
              })
            }
          })

        })
        
    },
    handleStation(options){
      xyRequest.get("/seat",
            {stationId: options.detail}
          ).then(res => {
            const data = res.data.data;

            if(data.length) {
              let items = uniqueFunc(data, "district");
              let partitions = items.map((item, index) => {
                return Object.assign({}, {'text': item.district, value: item.id})
              })
              let seats = selectPartition(data, items[0].district)
              this.setData({
                partition: partitions,
                value4: partitions[0].value,
              })
              this.triggerEvent('cityEvent', {seats: seats})
            }else {
              this.setData({
                partition: {text: '待填充', value: 0},
                value4: 0,
              })
            }
          })
    },
    handlePartition(e) {
      const title = selectTitle(this.data.partition, e.detail)
      xyRequest.get("/seat", {
        stationId: this.data.value3
      }).then(res => {
        const data = res.data.data;
        let seats = selectPartition(data, title)
        // console.log(seats);
        // this.setData({
        //   seats: seats
        // })
        this.triggerEvent('cityEvent', {seats: seats})
      })
    }
  }
})
