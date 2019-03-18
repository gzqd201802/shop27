<template>
  <view>
    <!-- 3. 使用组件 -->
    <search></search>  
    WXML 结构
  </view>
</template>

<script>
// 1. 导入组件
import Search from "../../components/search";
export default {
  data () {
    
  },
  // 2. 注册组件
  components:{
    Search
  }
}
</script>

<style>
/* 最终编译成 WXSS */

</style>
