<template>
  <view>
    <!-- 1.3. 使用组件 -->
    <search></search>  
    <!-- 2.0 分类内容 -->
    <view class="cata">


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



      <view class="cata-right">右边</view>
    </view>
  </view>
</template>

<script>
// 1.1. 导入组件
import Search from "../../components/search";
export default {
  data () {
    return{
      tabIndex: 0
    }
  },
  // 1.2. 注册组件
  components:{
    Search
  },
  // 注册时间
  methods:{
    // 切换tab栏
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
.cata-left{
  width: 200rpx;
  background-color: #f4f4f4;
  height: 100%;
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

.cata-right{
  flex: 1;
  background-color:bisque;
  height: 100%;
}
</style>
