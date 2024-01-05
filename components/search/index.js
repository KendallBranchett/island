import { KeywordModel } from "../../models/keyword";
import { BookModel } from "../../models/book"

const keywordModel = new KeywordModel();
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArr: [],
    showSearching: false
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
      this.setData({
        showSearching: true
      })
      const word = event.detail.value;
      bookModel.search(0, word).then((res) => {
        this.setData({
          dataArr: res.data.books,
        });
        keywordModel.addToHistory(word);
      });
    },
  },
});
