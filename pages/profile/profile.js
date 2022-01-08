// pages/profile/profile.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    isShowLogin: true,
    show: false
  },

  //显示弹窗
  showPopup(e) {
    if(this.data.nickName !== '') {
      this.setData({ show: true });
    }else {
      this.handleUserInfo();
    }
  },

  //关闭弹窗
  onClose() {
    this.setData({ show: false });
  },


  //登陆信息
  handleUserInfo() {
    wx.getUserProfile({
      desc:'展示数据',
      success: (res) => {
        console.log(res);
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          isShowLogin: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.nickName == ''){
      this.setData({
        isShowLogin: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})