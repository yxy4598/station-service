const BASE_URL = "http://nint.ltd:8531"

class XYRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        success: function(res) {
          resolve(res);
        },
        fail: function(err) {
          reject(err);
        }
      })
    })
  }
  get(url, params) {
    return this.request(url, "GET", params);
  }
  post(url, params) {
    return this.request(url, "POST", params);
  }
}

const xyRequest = new XYRequest();
export default xyRequest;