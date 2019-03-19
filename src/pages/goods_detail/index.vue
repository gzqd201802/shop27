<template>
  <view>
    商品详情页 {{goods_id}}
  </view>
</template>

<script>
export default {
  data () {
    return{
      goods_id:""
    }
  },
  onLoad(query){
    this.goods_id = query.goods_id;
  }
}
</script>

<style>
/* 最终编译成 WXSS */

</style>
