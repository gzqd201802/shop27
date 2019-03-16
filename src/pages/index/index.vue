<template>
  <view>
    <!-- 1.0 搜索框 -->
    <navigator url="/pages/search/main" class="search" hover-class="none">
      <view class="search-in">
        <icon class="search-icon" type="search" size="32rpx"></icon>
        搜索
      </view>
    </navigator>
    <!-- 2.0 轮播图 -->
    <swiper
      indicator-dots
      autoplay
      circular
      interval="2000"
      indicator-color="rgba(255,255,255,0.3)"
      indicator-active-color="rgba(255,255,255,1)"
    >
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" mode="aspectfill"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 3.0 首页分类入口 -->
    <view class="cate">
      <block
        v-for="(item,index) in cate"
        :key="index">
          <image class="cate-img" src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/icon_index_nav_4@2x.png"> </image>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      imgUrls: [
        "https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/banner1.png",
        "https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/banner2.png",
        "https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/banner3.png"
      ],
      cate:[1,2,3,4]
    };
  }
};
</script>

<style>
/* 1.0 搜索框*/
.search {
  background-color: #eb4450;
  padding: 20rpx;
}
.search-in{
  height: 60rpx;
  background-color: #fff;
  border-radius: 10rpx; 
  color:#666;
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-icon{
  margin-right: 10rpx;
}
/* 2.0 轮播图 */
.slide-image{
  width: 750rpx;
  height: 340rpx;
}
swiper {
  height: 340rpx;
}
/* 3.0 首页分类入口 */
.cate{
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.cate-img{
  /* flex: 1; */
  width: 128rpx;
  height: 140rpx;
}
</style>
