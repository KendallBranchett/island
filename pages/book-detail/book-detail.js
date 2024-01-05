import { BookModel } from "../../models/book";
import { LikeModel } from "../../models/like";

const bookModel = new BookModel();
const likeModel = new LikeModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: {},
    summary: "",
    likeStatus: false,
    likeCount: 0,
    showPosting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading()
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);
    console.log("this.data.book", this.data.book);

    Promise.all([detail, comments, likeStatus]).then((res) => {
      this.setData({
        book: res[0].data,
        summary: res[0].data.summary,
        comments: res[1].data.comments,
        likeStatus: res[2].data.like_status,
        likeCount: res[2].data.fav_nums,
      })
      wx.hideLoading()
    })

    // detail.then((res) => {
    //   console.log("detail", res.data);
    //   this.setData({
    //     book: res.data,
    //     summary: res.data.summary,
    //   });
    // });
    // comments.then((res) => {
    //   console.log(res.data);
    //   this.setData({
    //     comments: res.data.comments,
    //   });
    // });
    // likeStatus.then((res) => {
    //   console.log(res.data);
    //   this.setData({
    //     likeStatus: res.data.like_status,
    //     likeCount: res.data.fav_nums,
    //   });
    // });
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel, this.data.book.id, 400);
  },

  onFakePost(event) {
    this.setData({
      showPosting: true,
    });
  },

  onCancel(event) {
    this.setData({
      showPosting: false,
    });
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value;
    if(!comment) return

    if (comment.length > 12) {
      wx.showToast({
        title: "短评最多12个字",
        icon: "none",
      });
      return;
    }
    bookModel.postComment(this.data.book.id, comment).then((res) => {
      wx.showToast({
        title: "+1",
        icon: "none"
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        showPosting: false
      })

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
