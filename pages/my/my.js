import { BookModel } from "../../models/book"
import { ClassicModel } from "../../models/classic"

const bookModel = new BookModel();
const classicModel = new ClassicModel()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    defaultAvatarUrl: '/images/my/my.png',
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if(data.authSetting['scope.userInfo ']) {
          
        }else {

        }
      }
    })
  },
  async getMyBookCount() {
    const { data } = await bookModel.getMyBookCount()
    this.setData({
      bookCount: data.count
    })
    //promise写法
    // bookModel.getMyBookCount().then(res => {
    //   this.setData({
    //     bookCount: res.data.count
    //   })
    // })
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})