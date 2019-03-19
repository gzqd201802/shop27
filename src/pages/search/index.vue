<template>
  <view>
    <!-- 1.0 搜索分区 -->
    <view class="search-wrapper">
      <view class="search-input">
        <icon type="search" size="32rpx"></icon>
        <input type="text" 
          placeholder="请输入你想要的商品"
          :value="keyword" 
          v-model="inputVal" 
          @confirm="inputSumbit"
          @input="inputHandle"
          />
      </view>
      <button class="cancel" size="mini" v-show="inputVal" @tap="clearInput">取消</button>
    </view>
    <!-- 2.0.1 历史分区 -->
    <view class="history-title" v-show="history.length > 0">
      <text>历史搜索</text>
      <icon type="clear" size="30rpx" @tap="removeHistory"></icon>
    </view>
    <!-- 2.0.2 历史列表 -->
    <view class="history-list">
      <block v-for="(item,index) in history" :key="index">
        <view @tap="gotoGoodsList(item)" class="history-list-item">{{ item }}</view>
      </block>
    </view>
    <!-- 3.0 搜索提示 -->
    <view class="search-tips" v-show="tips.length > 0">
      <block v-for="(item,index) in tips" :key="index">
        <view class="search-tips-item" @tap="gotoGoodsDetail(item.goods_id)">
          {{ item.goods_name }}
        </view>
      </block>
    </view>

  </view>
</template>

<script>
import { getTips } from "@/api";
export default {
  data () {
    return{
      keyword:'',
      history:[],
      inputVal:'',
      tips:[]
    }
  },
  // 生命周期函数 onLoad 可以获取页面参数，只会在加载的时候触发一次
  onLoad(query){
    this.keyword = query.keyword;
  },
  // 3.0 生命周期函数 onShow 页面隐藏后再显示可触发
  onShow(){
    // 3.0.1 如果本地有历史，存到 data 的 history 中，如果没有就赋值空数组
    this.history = wx.getStorageSync('history') || [];
  },
  methods:{
    // 1. 输入框点击完成的时候触发，在模拟器中可通过按回车模拟触发
    inputSumbit(){
      // console.log(this.inputVal);
      // 1.0.1 把输入框的数据《前添加》到数组中
      this.history.unshift(this.inputVal);

      // 1.0.2 把历史存到本地
      wx.setStorageSync('history', this.history);

      // 1.0.3 跳转到商品列表页
      wx.redirectTo({ url: '/pages/goods_list/main?keyword='+ this.inputVal });

    },
    // 2.0 清除历史记录
    removeHistory(){
      // 2.0.1 清空视图的数据
      this.history = [];
      // 2.0.2 移除本地存储的历史
      wx.removeStorageSync('history');
    },
    // 3.0 点击搜索历史跳转到商品列表
    gotoGoodsList(keyword){
      wx.redirectTo({ url: '/pages/goods_list/main?keyword='+ keyword });
    },
    // 4.0 点击取消按钮清空输入框
    clearInput(){
      this.inputVal = '';
    },
    // 5.0 输入框输入内容的时候触发
    inputHandle(){
      // 5.0.1 根据输入框的内容发起请求，获取搜索提示列表
      getTips({
        query: this.inputVal
      }).then(res=>{
        this.tips = res.data.message;
      })
    },
    // 6.0 点击提示列表跳转到商品详情页
    gotoGoodsDetail(id){
      // 点击跳转商品详情页
      wx.navigateTo({ url: '/pages/goods_detail/main?goods_id='+id });
    }
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
