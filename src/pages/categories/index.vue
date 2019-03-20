<template>
  <view>
    <!-- 1.0.3. 使用搜索组件 -->
    <search></search>  
    <!-- 2.0 分类内容 -->
    <view class="cata">

      <!-- 3.0 分类左边 -->
      <scroll-view scroll-y class="cata-left">
        <block v-for="(item,index) in cate" :key="index">
          <view 
            class="item" 
            :class="{ active : index === tabIndex }"
            @tap="changeTabs(index)"
          >
            {{ item.cat_name }}
          </view>
        </block>
      </scroll-view>

      <!-- 4.0 分类右边 -->
      <scroll-view scroll-y class="cata-right">
        <block v-for="(item,index) in rightData" :key="index">
          <view class="cata-right-title">
            {{ item.cat_name }}
          </view>
          <view class="cate-right-list">
            <block v-for="(subitem,subindex) in item.children" :key="subindex">
              <!-- 具体分类，点击能跳转到列表页 -->
              <view 
                class="cate-right-list-item"
                @tap="gotoGoodsList(subitem.cat_name)"
              >
                <image :src="subitem.cat_icon">
                </image>
                <view>{{ subitem.cat_name }}</view>
              </view>
            </block>
          </view>
      </block>
      </scroll-view>

    </view>
  </view>
</template>

<script>
// 1.0.1. 导入搜索组件
import Search from "../../components/search";
// 4.0 导入请求模块
import request from '../../utils/request';
export default {
  data () {
    return{
      // tab栏索引值
      tabIndex: 0,
      cate:[],
      rightData:[]
    }
  },
  // 1.0.2. 注册搜索组件
  components:{
    Search
  },
  onLoad(){
    // 4.0.2 加载数据前，给用户提示
    wx.showLoading({
      title: '客官骚等',
      mask: true
    });
    // 4.0.1 使用封装的 request 发请求
    request("https://www.zhengzhicheng.cn/api/public/v1/categories").then((res)=>{
      // console.log(res);
      this.cate = res.data.message;
      this.rightData = this.cate[this.tabIndex].children;
      // 4.0.3 加载成功后，记得隐藏加载框
      wx.hideLoading();
    });
  },
  // 3.0 注册事件
  methods:{
    // 3.0.1 切换tab栏事件
    changeTabs(index){
      this.tabIndex = index;
      // 1.先清空
      this.rightData = [];
      // 2. 赋值阶段，利用定时器让数据清空后再赋值
      setTimeout(()=>{
        this.rightData = this.cate[this.tabIndex].children;
      },0);
    },
    // 跳转到商品列表页
    gotoGoodsList(name){
      // /pages/goods_list/main?keyword=关键字
      wx.navigateTo({ url: '/pages/goods_list/main' + '?keyword=' + name });
    }
  },
}
</script>

<style>
.search {
  position: fixed;
  width: 100%;
  box-sizing: border-box;
}
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
