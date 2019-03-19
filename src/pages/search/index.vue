<template>
  <view>
    <!-- 1.0 搜索分区 -->
    <view class="search-wrapper">
      <view class="search-input">
        <icon type="search" size="32rpx"></icon>
        <input type="text" :value="keyword" placeholder="请输入你想要的商品">
      </view>
      <button class="cancel" size="mini">取消</button>
    </view>
    <!-- 2.0.1 历史分区 -->
    <view class="history-title">
      <text>历史搜索</text>
      <icon type="clear" size="30rpx"></icon>
    </view>
    <!-- 2.0.2 历史列表 -->
    <view class="history-list">
      <block v-for="(item,index) in history" :key="index">
        <view class="history-list-item">小米</view>
      </block>
    </view>
    <!-- 3.0 搜索提示 -->
    <view class="search-tips" v-show="false">
      <block v-for="(item,index) in [11,1,1,11,1,111,1,111,1,111,1,111,1,111,1,1]" :key="index">
        <view class="search-tips-item">
          提示1
        </view>
      </block>
    </view>

  </view>
</template>

<script>
export default {
  data () {
    return{
      keyword:'',
      history:[1,2,2,2,1,2,2,2,2,2,1,2,2]
    }
  },
  onLoad(query){
    this.keyword = query.keyword;
  }
}
</script>

<style lang="scss">
// 搜索分区
.search-wrapper{
    background: #eee;
    padding:20rpx;
    display: flex;
    .search-input{
        background: #fff;
        display: flex;
        align-items: center;
        height: 60rpx;
        flex:1;

        icon{
            margin:0 10px;
        }

        input{
            flex:1;
            font-size: 14px;
            padding-right:20rpx;
        }
    }

    .cancel{
        width:160rpx;
        height:60rpx;
        padding:0;
        line-height: 58rpx;
        margin-left:20rpx;
    }
}
// 历史分区
.history-title{
    padding:20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.history-list{
    padding:10rpx;
    &-item{
        display: inline-block;
        padding:0 20rpx;
        line-height: 2;
        background:#eee;
        margin:10rpx;
    }
}
// 搜索提示
.search-tips{
  position: fixed;
  left:0;
  right:0;
  top:98rpx;
  bottom:0;
  background-color: #eee;
    &-item{
      border-bottom:1rpx solid #ccc;
      padding: 20rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
}
</style>
