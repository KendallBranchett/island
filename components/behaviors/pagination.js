const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
    noneResult: false,
    loading: false
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
      if (total === 0) {
        this.setData({
            noneResult: true
        })
      }
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
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      });
      //   this.data.dataArray = [];
      this.data.total = null;
    },
    isLocked() {
      return this.data.loading ? true : false
    },
    locked() {
      this.setData({
        loading: true
      })
      // this.data.loading = true;
    },
    unLocked() {
      this.setData({
        loading: false
      })
      // this.data.loading = false;
    },
  },
});

export { paginationBev };
