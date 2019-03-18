<template>
  <!-- 1.0 搜索框 -->
  <navigator url="/pages/search/main" class="search" hover-class="none">
    <view class="search-in">
      <icon class="search-icon" type="search" size="32rpx"></icon>
      搜索
    </view>
  </navigator>
</template>

<script>
export default {
  
}
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
</style>
