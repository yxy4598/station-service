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
    provinceEvent: String,
    cityEvent: String,
    stationEvent: String,
    partitionEvent: String,
    isSeat: {
      type: String,
      observer: (newVal, oldVal) => {
        // console.log(newVal, oldVal);
      }
    },
    isToilet: {
      type: String,
      observer: (newVal, oldVal) => {
        // console.log(newVal, oldVal);
      }
    }
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
    sex: 'man',

    stationName: "",
    toilet: [],
    seats: []
  },

  
  ready: function() {
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
          if(this.properties.isSeat) {
              xyRequest.get("/seat/all",
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
          }
          if(this.properties.isToilet){
            xyRequest.get("/seat",
              {stationId: this.data.value3}
            ).then(res => {
              const data = res.data.data;
              if(data.length) {
                let items = uniqueFunc(data, "district");
                let tempPartitions = items.map((item, index) => {
                  if(item.district == 'man') {
                    return Object.assign({}, {'text': '男厕所', value: item.id})
                  }else if(item.district == 'woman') {
                    return Object.assign({}, {'text': '女厕所', value: item.id})
                  }else {
                    return
                  }
                })
                let partitions = tempPartitions.filter(item => {
                  return item != undefined
                })
                let sex = partitions[this.data.value4].text;
                if(sex == '男厕所') {
                  sex = 'man'
                }else {
                  sex ='woman'
                }
                let toilet = selectPartition(data, sex)
                this.setData({
                  partition: partitions,
                  value4: partitions[0].value
                })
                this.triggerEvent('cityToiletEvent', {toilet: toilet, stationName: this.data.stationName})
              }else {
                this.setData({
                  partition: {text: '待填充', value: 0},
                  value4: 0
                })
                this.triggerEvent('cityToiletEvent', { stationName: this.data.station[0].text})
              }
            })
          }

        })
      })
    })
    // console.log(this.properties.isSeat, this.properties.isToilet);
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
          if(data.length) {
            let stations = data.map((item, index) => {
              return Object.assign({}, {'text': item.name, value: item.id})
            })
            this.setData({
              station: stations,
              value3: stations[0].value
            })
          }else {
            this.setData({
              station: [{'text': '待填充', value: 0}],
              value3: 0
            })
          }

          xyRequest.get("/seat/all",
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
      console.log(this.properties.isSeat, this.properties.isToilet);
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

          xyRequest.get("/seat/all",
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
      xyRequest.get("/seat/all",
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
      xyRequest.get("/seat/all", {
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
    },


    //厕所区域
    handleToiletProvince(options) {
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
          if(data.length) {
            let stations = data.map((item, index) => {
              return Object.assign({}, {'text': item.name, value: item.id})
            })
            this.setData({
              station: stations,
              value3: stations[0].value
            })
          }else {
            this.setData({
              station: [{text: '待填充', value: 0}],
              value3: 0
            })
          }

          xyRequest.get("/seat",
            {stationId: this.data.value3}
          ).then(res => {
            const data = res.data.data;
            if(data.length) {
              let items = uniqueFunc(data, "district");
              let tempPartitions = items.map((item, index) => {
                if(item.district == 'man') {
                  return Object.assign({}, {'text': '男厕所', value: item.id})
                }else if(item.district == 'woman') {
                  return Object.assign({}, {'text': '女厕所', value: item.id})
                }else {
                  return
                }
              })
              let partitions = tempPartitions.filter(item => {
                return item != undefined
              })
              let sex = partitions[this.data.value4].text;
              if(sex == '男厕所') {
                sex = 'man'
              }else {
                sex ='woman'
              }
              let toilet = selectPartition(data, sex)
              this.setData({
                partition: partitions,
                value4: partitions[0].value
              })
              console.log(this.data.stationName);
              this.triggerEvent('cityToiletEvent', {toilet: toilet, stationName: this.data.stationName})
            }else {
              this.setData({
                partition: {text: '待填充', value: 0},
                value4: 0
              })
              this.triggerEvent('cityToiletEvent', { stationName: this.data.station[0].text})
            }
          })
        })
      })
    },
    handleToiletCity(options) {
      xyRequest.get("/station/region/" + options.detail,
        ).then(res=>{
          const data = res.data.data;
          let stations = data.map((item, index) => {
            return Object.assign({}, {'text': item.name, value: item.id})
          })
          this.setData({
            station: stations,
            value3: stations[0].value,
            stationName: stations[0].text
          })
          xyRequest.get("/seat",
            {stationId: this.data.value3}
          ).then(res => {
            const data = res.data.data;
            if(data.length) {
              let items = uniqueFunc(data, "district");
              let tempPartitions = items.map((item, index) => {
                if(item.district == 'man') {
                  return Object.assign({}, {'text': '男厕所', value: item.id})
                }else if(item.district == 'woman') {
                  return Object.assign({}, {'text': '女厕所', value: item.id})
                }else {
                  return
                }
              })
              let partitions = tempPartitions.filter(item => {
                return item != undefined
              })
              let sex = partitions[this.data.value4].text;
              if(sex == '男厕所') {
                sex = 'man'
              }else {
                sex ='woman'
              }
              let toilet = selectPartition(data, sex)
              this.setData({
                partition: partitions,
                value4: partitions[0].value
              })
              this.triggerEvent('cityToiletEvent', {toilet: toilet, stationName: this.data.stationName})
            }else {
              this.setData({
                partition: {text: '待填充', value: 0},
                value4: 0
              })
              this.triggerEvent('cityToiletEvent', { stationName: this.data.stationName})
            }
          })
        })
    },
    handleToiletStation(options) {
      xyRequest.get("/seat",
          {stationId: options.detail}
        ).then(res => {
          const data = res.data.data;
          if(data.length) {
            let items = uniqueFunc(data, "district");
            let tempPartitions = items.map((item, index) => {
              if(item.district == 'man') {
                return Object.assign({}, {'text': '男厕所', value: item.id})
              }else if(item.district == 'woman') {
                return Object.assign({}, {'text': '女厕所', value: item.id})
              }else {
                return
              }
            })
            let partitions = tempPartitions.filter(item => {
              return item != undefined
            })
            let sex = partitions[this.data.value4].text;
            if(sex == '男厕所') {
              sex = 'man'
            }else {
              sex ='woman'
            }
            console.log(sex);
            let toilet = selectPartition(data, sex)
            this.setData({
              partition: partitions,
              value4: partitions[0].value
            })
            this.triggerEvent('cityToiletEvent', {toilet: toilet, stationName: this.data.stationName})
          }else {
            let station = this.data.station.filter(item => item.value == options.detail)
            this.setData({
              partition: {text: '待填充', value: 0},
              value4: 0,
              stationName: station[0].text
            })
            this.triggerEvent('cityToiletEvent', { stationName: this.data.stationName})
          }
        })
    },
    handleToiletPartition(e) {
      //存在问题
      // console.log(e);
      let title = selectTitle(this.data.partition, e.detail)
      // console.log(title);
      if(title == '男厕所') {
        title = 'man'
      }else {
        title = 'woman'
      }
      xyRequest.get("/seat", {
        stationId: this.data.value3
      }).then(res => {
        const data = res.data.data;
        let toilet = selectPartition(data, title)
        // console.log(toilet);
        // console.log(seats);
        // this.setData({
        //   seats: seats
        // })
        this.triggerEvent('cityEvent', {toilet: toilet})
      })
    }
  }
})
