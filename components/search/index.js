import { KeywordModel } from "../../models/keyword";
import { BookModel } from "../../models/book";
import { paginationBev } from "../behaviors/pagination";

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: "loadMore",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArr: [],
    showSearching: false,
    q: "",
    loading: false,
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory(),
    });
    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.data.hot,
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent("cancel", {}, {});
    },
    onConfirm(event) {
      this._showResult()
      this.initialize();
      const word = event.detail.value || event.detail.text;
      bookModel.search(0, word).then((res) => {
        this.setMoreData(res.data.books);
        this.setTotal(res.data.total);
        this.setData({
          // dataArr: res.data.books,
          q: word,
        });
        keywordModel.addToHistory(word);
      });
    },
    onDelete(event) {
      this._closeResult()
    },
    loadMore() {
      if (!this.data.q) {
        return;
      }
      if (this._isLocked()) {
        return;
      }
      // const length = this.data.dataArr.length;
      if (this.hasMore()) {
        this._locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.data.books);
          this._unLocked();
          // //合并两组数据
          // const tempArray = this.data.dataArr.concat(res.data.books);
          // this.setData({
          //   dataArr: tempArray,
          // })
        },() => {
          this._unLocked()
        });
      }
    },
    _showResult() {
      this.setData({
        showSearching: true,
      });
    },
    _closeResult() {
      this.setData({
        showSearching: false,
      });
    },
    _isLocked() {
      return this.data.loading ? true : false
    },
    _locked() {
      this.data.loading = true;
    },
    _unLocked() {
      this.data.loading = false;
    }
  },
});
