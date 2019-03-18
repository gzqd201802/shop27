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
          <!-- 图片路径 -->
          <image :src="item.image_src" class="slide-image" mode="aspectfill"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 3.0 首页分类入口 -->
    <view class="cate">
      <block
        v-for="(item,index) in cate"
        :key="index">
          <image class="cate-img" :src="item.image_src"> </image>
      </block>
    </view>
    <!-- 4.0 首页楼层 -->
    <block v-for="(item,index) in floor" :key="index">
    <view class="divide"></view>
      <view class="floor">
        <view class="floor-title">
          <image 
            :src="item.floor_title.image_src"
          >
          </image>
        </view>
        <view class="floor-body">
          <view class="floor-body-left">
            <image
              :src="item.product_list[0].image_src"
              >
            </image>
          </view>
          <view class="floor-body-right">
            <block v-for="(subItem,subIndex) in item.product_list" :key="subIndex" >
              <image v-if="subIndex !== 0" :src="item.product_list[subIndex].image_src"></image>
            </block>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 1.0 轮播图数据
      imgUrls: [],
      cate:[],
      floor:[]
    };
  },
  // onLoad 在小程序页面加载的时候触发一次
  onLoad(){
    // 1.0.1 在页面加载的时候请求轮播图数据
    wx.request({
      // 不同服务器请求的数据有差异
      // url:"https://autumnfish.cn/wx/api/public/v1/home/swiperdata",
      url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata', 
      success: res => {
        console.log(res);
        // 1.0.2 请求成功后，进行数据绑定
        this.imgUrls = res.data.message;
      }
    });

    // 2.0 请求导航分类数据
    wx.request({
      url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems', 
      success: res => {
        this.cate = res.data.message;
      }
    });

    // 3.0 请求首页楼层数据
    wx.request({
      url: 'https://www.zhengzhicheng.cn/api/public/v1/home/floordata', 
      success: res => {
        this.floor = res.data.message;
      }
    });

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
/* 分割盒子 */
.divide{
  height: 20rpx;
  background-color: #f4f4f4;
}
.floor-title image{
  width: 750rpx;
  height: 59rpx;
  background-color: #f4f4f4;
}
.floor-body{
  display: flex;
  padding: 20rpx 0 20rpx 20rpx;
}
.floor-body-left image{
  width: 232rpx;
  height: 386rpx;
  margin-right: 10rpx;
}
.floor-body-right image{
  width: 232rpx;
   height: 188rpx;
  margin-right: 10rpx;
}

</style>
