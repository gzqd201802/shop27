<template>
  <view>
    <!-- 1.0 商品列表页 {{ keyword }} -->
    <view class="search-wrapper">
        <view class="search-input">
            <icon type="search" size="32rpx"></icon>
            {{keyword}}
        </view>
    </view>
    <!-- 2.0 tab栏 -->
    <view class="tab">
        <block v-for="(item,index) in tabsItems" :key="index">
            <view class="tab-item" :class="{ active: index === tabIndex }">
                {{ item }}
            </view>
        </block>
    </view>
    <!-- 3.0 商品列表 -->
    <view class="goods-list">
        <block
          v-for="(item,index) in goodsList"
          :key="index">
            <view class="goods-item">
                <image :src="item.goods_small_logo"> </image>
                <view class="goods-right">
                    <view class="goods-title">
                        {{ item.goods_name }}
                    </view>
                    <view class="price">
                        ￥{{ item.goods_price }}
                    </view>
                </view>
            </view>
        </block>
    </view>
    <!-- 4.0 没有数据的提示 -->
    <view class="loading" v-show="!hasMore">我是有底线的....</view>
  </view>
</template>

<script>
// 2.0 导入请求搜索的函数
import { getSearch } from "@/api/index.js";
export default {
  data () {
    return{
      keyword:'',
      tabsItems: ["综合","销量","价格"],
      tabIndex:0,
      goodsList: [],
      pagenum:1,
      pagesize:20,
      hasMore: true
    }
  },
  // 1.0 获取页面启动参数只能在 onLoad 生命周期函数中获取
  onLoad(query){
    // 1.0.1 获取页面启动参数中的关键字
    this.keyword = query.keyword;
    // 页面加载的时候调用获取数据的函数
    this.getData();
  },
  // 页面卸载事件
  onUnload(){
    //   初始化数据，防止小程序页面 data 数据的缓存
    this.initData();
  },
  methods:{
    // 3.0 封装获取数据的方法
    getData(){
        // 4.0 如果 hasMore 假，不要发起请求了
        if(!this.hasMore) return;
        // 加载提示
        wx.showLoading({
          title: '加载中...'
        });
        // 2.0 调用函数，发起搜索请求
        getSearch({
            query: this.keyword,
            pagenum: this.pagenum,
            pagesize: this.pagesize
        }).then(res=>{
            // 3.0.1 在回调函数中赋值
            let { goods } = res.data.message;
            // 3.0.2 解构赋值连接数组
            this.goodsList = [...this.goodsList , ...goods];
            // 3.0.2 concat 方法连接数组
            // this.goodsList = this.goodsList.concat(goods);

            // 3.0.3 请求成功后，页码加 1
            this.pagenum++;

            // 4.0.1 如果请求到的数据的长度，小于 pagesize ，说明没数据了
            if(goods.length < this.pagesize){
                this.hasMore = false;
            }
            // 数据加载完成后，隐藏加载框
            wx.hideLoading();
            // 把下拉刷新动画页停止
            wx.stopPullDownRefresh();
            
        })
    },
    // 初始化 data 数据
    initData(){
        this.pagenum = 1;
        this.hasMore = true;
        this.goodsList = [];
    },
  },
  // 6. 下拉刷新事件
  onPullDownRefresh(){
    //  6.0.1 初始化页面数据
    this.initData();

    //  6.0.2 重新请求数据
    this.getData();
  },
  // 页面触底事件
  onReachBottom(){
    // 页面触底的时候页调用获取数据的函数
    this.getData();
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

        .goods-right{
            flex:1;
            display: flex;
            flex-direction:column;
            justify-content: space-between;

            .goods-title{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .price{
                color:red;
                font-size: 14px;
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
