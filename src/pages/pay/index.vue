<template>
  <view>
    <!-- 1.0 顶部地址选择 -->
    <view class="cart-top">
      <!-- 1.0.1 用户选择了收货地址的时候展示 -->
      <block v-if="address.username">
        <view class="user">
          <text>收货人：{{ address.username }}</text>
          <text>{{ address.tel }}</text>
        </view>
        <view class="address">
          收货地址：{{ address.addressInfo }}
        </view>
      </block>
      <!-- 1.0.2 用户没选择收货地址的时候，显示添加收货地址 -->
      <block v-else>
        <view class="add-address">
          <button>+ 添加收货地址</button>
        </view>
      </block>
      <view class="address-border"></view>
    </view>
    <!-- 2.0 店铺标题和商品列表 -->
    <view class="list-title">优购生活馆</view>
    <view class="ware-list">
      <!-- 2.0.1 商品列表 -->
      <block v-for="(item,index) in cartList" :key="index">
        <view class="ware-item" @tap="gotoDetail(item.goods_id)" v-if="item.selected">
          <!-- 2.0.2 左边按钮 -->
          <!-- 2.0.3 右边图片和商品信息 -->
          <div class="ware-content">
            <!-- 2.0.4 图片 -->
            <view class="ware-image">
              <image :src="item.goods_small_logo" mode="aspectFill"></image>
            </view>
            <!-- 2.0.5 商品信息 -->
            <view class="ware-info">
              <view class="ware-info-title">
                {{ item.goods_name }}
              </view>
              <div class="ware-info-btm">
                <view class="ware-price">
                  ￥ {{ item.goods_price }}
                </view>
                <div class="calculate">
                  <div class="number">x {{ item.count }}</div>
                </div>
              </div>
            </view>
          </div>
        </view>
      </block>
    </view>
    <!-- 3.0 底部固定条 -->
    <div class="cart-total">
      <view class="total-center">
        <view>合计:<text class="color-red">￥ {{ computedData.allPrice }}</text> </view>
        <div class="price-tips">包含运费</div>
      </view>
      <view class="accounts" @tap="payOrder">
        支付
      </view>
    </div>
  </view>
</template>

<script>
export default {
  data () {
    return{
      address:{
        username:"",
        tel:"",
        addressInfo:""
      },
      cartList: {}
    }
  },
  // 计算属性
  computed:{
    computedData(){
      // 初始化价格为 0 
      let _allPrice = 0;
      let _allCount = 0;
      let _cartLength = Object.keys(this.cartList).length;
      // 遍历购物车数据中哪些商品被选中了，计算总金额
      for(let key in this.cartList){
        let item = this.cartList[key];
        // 如果遍历到的元素为选中状态，才计算
        if(item.selected){
          // 价格 * 数量
          _allPrice += item.goods_price * item.count;
          // 选中总个数
          _allCount++;
        }
      }
      // 总金额返回值
      return {
        allPrice: _allPrice,
        allCount: _allCount,
        cartLength: _cartLength
      };
    },
  },
  // 生命周期函数
  onShow(){
    // 1.0.5 页面显示的时候获取收货地址
    this.address = wx.getStorageSync('address') || {};
    // 2.0.1 购物车列表获取
    this.cartList = wx.getStorageSync('cartList') || {};
  },
  methods:{
    // 2.0 点击跳转到详情页
    gotoDetail(id){
      wx.navigateTo({ url: '/pages/goods_detail/main?goods_id='+id });
    },
    // 7.0 发起微信支付
    payOrder(){
      console.log("发起微信支付");
    }
  }
}
</script>

<style lang="scss">
// 1.0 顶部地址选择
.cart-top {
    min-height: 180rpx;
    position: relative;
    .user {
        display: flex;
        padding: 20rpx;
        justify-content: space-between;
        position: relative;
        padding-right: 50rpx;
        &:after {
            display: block;
            content: "";
            width: 12px;
            height: 12px;
            border-top: 1px #999 solid;
            border-right: 1px #999 solid;
            transform: rotate(45deg);
            position: absolute;
            right: 20rpx;
            top: 20rpx;
            margin-top: 6px;
        }
    }
    .address {
        padding: 20rpx;
        padding-top: 0;
    }
    .address-border {
        width: 100%;
        height: 8px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: red;
    }
    .add-address {
        height: 180rpx;
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

// 2.0 页面选择按钮颜色
.icon-xuanze-fill {
    color: #ff2d4a;
}

// 2.0.1 店铺标题和商品列表
.list-title {
    padding: 20rpx;
    border-bottom: 1px #eee solid;
    border-top: 10px #eee solid;
}

.ware-list {
    padding-bottom: 100rpx;
}

.ware-item {
    padding: 20rpx;
    padding-bottom: 0;
    display: flex;
    align-items: center;

    .choice-button {
        flex-shrink: 0;
        text-align: center;
        margin-right: 20rpx;
        font-size: 32rpx;
    }

    .ware-content {
        display: flex;
        flex: 1;
        justify-content: space-between;
        border-bottom: 1px #eee solid;
        padding-bottom: 20rpx;
    }

    .ware-image {
        image {
            display: block;
            width: 200rpx;
            height: 200rpx;
        }
    }

    .ware-info {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .ware-info-title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .ware-info-btm {
            display: flex;
            justify-content: space-between;
            .ware-price {
                color: red;
            }
            .calculate {
                display: flex;

                .rect {
                    width: 20px;
                    text-align: center;
                    border: 1px #999 solid;
                    line-height: 1.2;
                }
                .number {
                    margin: 0 10px;
                }
            }
        }
    }
}

// 3.0 底部固定条
.cart-total {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    .total-button {
        padding-left: 20px;
        display: flex;
        align-items: center;
        .iconfont {
            margin-right: 10px;
        }
    }
    .total-center {
        flex: 1;
        padding: 20rpx;
        text-align: right;
        .color-red {
            color: red;
        }
        .price-tips {
            font-size: 14px;
            color: #666;
        }
    }
    .accounts {
        width: 30%;
        height: 100rpx;
        background: red;
        color: #fff;
        line-height: 100rpx;
        text-align: center;
    }
}
</style>
