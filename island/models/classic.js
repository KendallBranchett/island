import { HTTP } from "../util/http";

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res);
                console.log('getLatest的res', res,'getLatest的res.index',res.index)
                this._setLatestIndex(res.data.index);
                let key = this._getKey(res.data.index);
                wx.setStorageSync(key, res)
            }
          })
    }
    getClassic(index, nextOrPrev, sCallback) {
        console.log('getClassic的nextOrPrev', nextOrPrev)
        //缓存中寻找 or API写入到缓存中
        //key 确定key
        let key = nextOrPrev === 'next' ? this._getKey(index+1) : this._getKey(index-1);
        let classic = wx.getStorageSync(key);
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrev}`,
                success: (res) => {
                    console.log('getClassic回调函数res', res)
                    wx.setStorageSync(this._getKey(res.index), res)
                    sCallback(res);
                }
            })
        } else {
            sCallback(classic)
        }
    }
    isFirst(index) {
        console.log('isFirst的index', index)
        return index === 1 ? true : false;
    }
    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        console.log('isLatest比较latestIndex和index', 'index', index, 'latestIndex', latestIndex)
        return latestIndex === index ? true: false;
    }
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    _getLatestIndex() {
       let index =  wx.getStorageSync('latest')
       return index
    }

    _getKey(index) {
        let key = 'classic-' + index;
        return key
    }
}   

export {ClassicModel}