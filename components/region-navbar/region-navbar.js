// components/region-navbar.js

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
    province: [],
    city: [],
    station: [],
    partition: [],
    value1: '',
    value2: '',
    value3: '',
    value4: '',
  },

  
  created: function() {
    xyRequest.get("/region/province").then(res => {
      const data = res.data.data;
      let provinces = data.map((item, index) => {
        return Object.assign({}, {'text': item.name, value: item.id})
      })
      this.setData({
        province: provinces,
        value1: provinces[14].value
      })

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
            {stationId: 1}
          ).then(res => {
            console.log(res.data);
            const data = res.data.data;
            let partitions = data.map((item, index) => {
              return Object.assign({}, {'text': item.district, value: item.id})
            })
            console.log(partitions);
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
        })
    },
    handleStation(options){
      console.log(options.detail);
    }
  }
})
