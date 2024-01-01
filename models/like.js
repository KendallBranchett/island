import {HTTP} from '../util/http'

class LikeModel extends HTTP {
    like(behavior, artID, category) {
        let url = behavior === 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: artID,
                type: category
            },
            success: (data) => {
                console.log('like回调函数的data',data)
            }
        })
    }
    getClassicLikeStatus(artID,category,sCallback){
        this.request({
            url:'classic/' + category + '/' + artID + '/favor',
            success:sCallback
        })
    }
}


export {LikeModel}