import { BookModel } from "../../models/book";

const bookModel = new BookModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commments: [],
    book: {},
    likeStatus: false,
    likeCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    detail.then((res) => {
      console.log(res.data);
      this.setData({
        book: res.data,
      });
    });
    comments.then((res) => {
      console.log(res.data);
      this.setData({
        comments: res.data,
      });
    });
    likeStatus.then((res) => {
      console.log(res.data);
      this.setData({
        likeStatus: res.data.like_status,
        likeCount: res.data.fav_nums,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
