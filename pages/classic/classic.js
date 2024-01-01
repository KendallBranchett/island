import {ClassicModel} from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel() 
// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    classicModel.getLatest((res) => {
      console.log('res',res)
      console.log('res.data', res.data)
      this.setData({
        classic: res.data,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      })
      //latestClassic latestIndex currentClassic currentIndex
    })
  },

  onLike: function(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext: function(event) {
    this._updateClassic('next')
  },

  onPrev: function(event) {
    this._updateClassic('previous')
  },

  _updateClassic: function(nextOrPrev) {
    const index = this.data.classic.index
    console.log('_updateClassic的this.data.classic',this.data.classic)
    console.log('_updateClassic的index', index)
    classicModel.getClassic(index, nextOrPrev, (res) => {
      console.log('classicModel.getClassic的res', res)
      this._getLikeStatus(res.data.id, res.data.type )
      this.setData({
        classic: res.data,
        latest: classicModel.isLatest(res.data.index),
        first: classicModel.isFirst(res.data.index)
      })
    })
  },

  _getLikeStatus: function (artID, category) {
    likeModel.getClassicLikeStatus(artID, category,
      (res) => {
        this.setData({
          likeCount: res.data.fav_nums,
          likeStatus: res.data.like_status
        })
      })
  },
})