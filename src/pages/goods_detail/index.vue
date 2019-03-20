<template>
  <view>
    <!-- 1.0 轮播图模块 -->
    <swiper indicator-dots autoplay circular>
        <block v-for="(item,index) in [1,2,3,4]" :key="index">
            <swiper-item>
                <image class="slide-image" mode="aspectFill" src="https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg"></image>
            </swiper-item>
        </block>
    </swiper>
    <!-- 2.0 商品价格标题 -->
    <view class="goods-price">
      ￥ 999
    </view>
    <view class="goods-info">
      <view class="info-left">
        标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字
      </view>
      <view class="info-right">
        <icon
          type="success"
          size="24">
        </icon>
        收藏
      </view>
    </view>
    <!-- 3.0 商品详情图文介绍 -->
    <view class="detail">
       <view class="detail-title">
         商品详情标题
       </view>
       <view class="detail-conent">
         商品详情内容
       </view>
    </view>
    <!-- 4.0 底部固定条 -->
    <view class="footer">
      <view class="contact">
        客服盒子，被隐藏起来的
      </view>
      <view class="ft-left">
        联系客服
      </view>
      <view class="ft-left">
        购物车
      </view>
      <view class="ft-right">
        加入购物车
      </view>
      <view class="ft-right">
        立即购买
      </view>
    </view>

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

<style lang="scss">
/* 最终编译成 WXSS */
swiper{
    height:720rpx;

    image{
        height:720rpx;
        width:750rpx;
    }
}



.goods-price{
    padding:20rpx;
    color:red;
    font-size:22px;
}

.goods-info{
    padding:20rpx;
    padding-top:0;
    display: flex;

    .info-left{
      flex:1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .info-right{
        width:160rpx;
        flex-shrink: 0;
        text-align: center;
        color:#999;
        border-left:1px #999 solid;
        font-size:14px;
        margin-left:20rpx;

        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
    }
}

.detail{
    border-top:20rpx #eee solid;
    padding-bottom:120rpx;
    .detail-title{
        padding:20rpx;
        border-bottom:1px #eee solid;
    }
    .detail-content{
      // 父级字号设置为0，清除富文本图片之间的默认间距
      font-size: 0;
    }
}

.footer{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    height:100rpx;
    background:#fff;
    display: flex;

    .contact{
        width:20%;
        height:100rpx;
        padding:0;
        margin:0;
        position: absolute;
        left:0;
        top:0;
        // 隐藏真正的客服聊天按钮
        opacity: 0;
    }

    .ft-left{
        width:20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color:#666;
        font-size: 14px;

        .iconfont{
            font-size:18px;
        }
    }

    .ft-right{
        width:30%;
        background: orange;
        line-height: 100rpx;
        text-align: center;
        color:#fff;

        &:last-child{
            background: red;
        }
    }

}
</style>
