<template>
  <view>
    <!-- 1.0.3. 使用搜索组件 -->
    <search></search>  
    <!-- 2.0 分类内容 -->
    <view class="cata">

      <!-- 3.0 分类左边 -->
      <scroll-view scroll-y class="cata-left">
        <block v-for="(item,index) in [1,2,3,4,5,6,67,3,4,5,6,67,3,67,3,4,5,6,67,3,4,5,6,67]" :key="index">
          <view 
            class="item" 
            :class="{ active : index === tabIndex }"
            @tap="changeTabs(index)"
          >
            大家电
          </view>
        </block>
      </scroll-view>

      <!-- 4.0 分类右边 -->
      <scroll-view scroll-y class="cata-right">
        <view class="cata-right-title">
          电视
        </view>
        <view class="cate-right-list">
          <block v-for="(item,index) in [1,2,2,3,3,1,1,1,1,1,2,2,3,3,1,1,1,1,1,2,2,3,3,1,1,1,1,1,1,1]" :key="index">
            <view class="cate-right-list-item">
              <image src="https://img.alicdn.com/imgextra/i1/2536908852/TB2PZ9rpstnpuFjSZFKXXalFFXa_!!2536908852-0-beehive-scenes.jpg_360x360xzq90.jpg_.webp">
              </image>
              <view>分类名称</view>
            </view>
          </block>
        </view>
      </scroll-view>

    </view>
  </view>
</template>

<script>
// 1.0.1. 导入搜索组件
import Search from "../../components/search";
// 4.0 导入请求模块
import request from '../../utils/request.js';
export default {
  data () {
    return{
      // tab栏索引值
      tabIndex: 0
    }
  },
  // 1.0.2. 注册搜索组件
  components:{
    Search
  },
  onLoad(){
    // 4.0.1 使用封装的 request 发请求
    request("https://www.zhengzhicheng.cn/api/public/v1/categories").then((res)=>{
      console.log(res);
    })
  },
  // 3.0 注册事件
  methods:{
    // 3.0.1 切换tab栏事件
    changeTabs(index){
      this.tabIndex = index;
    }
  }
}
</script>

<style>
/* 最终编译成 WXSS */
.cata{
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top:100rpx;
  bottom: 0;
}
/* 分类左边 */
.cata-left{
  width: 200rpx;
  background-color: #f4f4f4;
  height: 100%;
  flex-shrink: 0;
  /* overflow: scroll; */
}
.cata-left .item{
  line-height: 100rpx;
  border-bottom: 1rpx solid #ccc;
  text-align: center;
  position: relative;
}
.cata-left .item.active{
  background-color: #fff;
  color:red;
}
.cata-left .item.active::before{
  content: "";
  position: absolute;
  
  width: 10rpx;
  background-color: red;
  left: 0;
  top:20rpx;
  bottom:20rpx;
}

/* 分类右边 */
.cata-right{
  flex: 1;
  height: 100%;
}

.cata-right-title{
  text-align: center;
  padding: 40rpx 0;
}
.cata-right-title::after,
.cata-right-title::before{
  content: "/";
  color:#ccc;
  margin: 0 20rpx;
}
/* 右侧列表 */
.cate-right-list{
  display: flex;
  flex-wrap: wrap;
}
.cate-right-list-item{
  width: 33.33%;
  font-size: 30rpx;
  text-align: center;
  padding: 20rpx 0;
}
.cate-right-list-item image{
  width: 120rpx;
  height: 120rpx;
}
</style>
