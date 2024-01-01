import { HTTP } from "../util/http-p.js";

class BookModel extends HTTP {
  getHotList() {
    return this.request({url: "book/hot_list"});
  }
}

export { BookModel };
