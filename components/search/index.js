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
    loadingCenter: false
  },

  async attached() {
    this.setData({
      historyWords: keywordModel.getHistory(),
    });
    const { data } = await keywordModel.getHot();
    this.setData({
      hotWords: data.hot,
    });
    //promise写法
    // keywordModel.getHot().then((res) => {
    //   this.setData({
    //     hotWords: res.data.hot,
    //   });
    // });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent("cancel", {}, {});
      this.initialize();
    },
    async onConfirm(event) {
      this._showResult();
      this._showLoadingCenter()
      // this.initialize();
      const word = event.detail.value || event.detail.text;
      const { data } = await bookModel.search(0, word);
      this.setMoreData(data.books);
      this.setTotal(data.total);
      this.setData({
        // dataArr: res.data.books,
        q: word,
      });
      keywordModel.addToHistory(word);
      this._hideLoadingCenter()
      //promise写法
      // bookModel.search(0, word).then((res) => {
      //   this.setMoreData(res.data.books);
      //   this.setTotal(res.data.total);
      //   this.setData({
      //     // dataArr: res.data.books,
      //     q: word,
      //   });
      //   keywordModel.addToHistory(word);
      //   this._hideLoadingCenter()
      // });
    },
    onDelete(event) {
      this._closeResult()
      this.initialize();
    },
    loadMore() {
      if (!this.data.q) {
        return;
      }
      if (this.isLocked()) {
        return;
      }
      // const length = this.data.dataArr.length;
      if (this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.data.books);
          this.unLocked();
          // //合并两组数据
          // const tempArray = this.data.dataArr.concat(res.data.books);
          // this.setData({
          //   dataArr: tempArray,
          // })
        },() => {
          this.unLocked()
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
        q: ''
      });
    },
    
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  },
});
