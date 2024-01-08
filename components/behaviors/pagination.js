const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray,
      });
    },
    getCurrentStart() {
      return this.data.dataArray.length;
    },
    setTotal(total) {
      this.data.total = total;
    },
    //是否还有更多数据需要加载
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },
    initialize() {
      this.data.dataArray = [];
      this.data.total = null;
    },
  },
});

export { paginationBev };
