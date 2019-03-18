<template>
  <view>
    <!-- 商品列表页 {{ keyword }} -->
    <view class="search-wrapper">
        <view class="search-input">
            <icon type="search" size="32rpx"></icon>
            {{keyword}}
        </view>
    </view>
    <!-- tab栏 -->
    <view class="tab">
        <block v-for="(item,index) in tabsItems" :key="index">
            <view class="tab-item" :class="{ active: index === tabIndex }">
                {{ item }}
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
      tabsItems: ["综合","销量","价格"],
      tabIndex:0
    }
  },
  // 获取页面启动参数只能在 onLoad 生命周期函数中获取
  onLoad(query){
    // console.log(query.keyword)
    this.keyword = query.keyword;
  },
}
</script>

<style lang="scss">
.search-wrapper{
    background: #eee;
    padding:20rpx;

    .search-input{
        background:#fff;
        height:60rpx;
        font-size:15px;
        color:#999;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
    }

    .search-input icon{
        margin-right:5px;
    }
}

.tab{
    display: flex;
    border-bottom:1px #eee solid;
    .tab-item{
        flex:1;
        text-align: center;
        line-height: 100rpx;
    }
    .active{
        color:red;
    }
}

.goods-list{
    padding-left:20rpx;

    .goods-item{
        padding:20rpx 20rpx 20rpx 0;
        display: flex;
        border-bottom:1px #eee solid;

        image{
            display: block;
            width:200rpx;
            height:200rpx;
            flex-shrink: 0;
            margin-right: 20rpx;
        }

        .goods-title{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .goods-right{
            flex:1;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
        }

        .price{
            color:red;
            font-size: 14px;
            span{
                font-size: 22px;
            }
        }
    }
}

.loading{
    line-height: 80rpx;
    text-align: center;
    font-size:14px;
    color:#999;
}
</style>
