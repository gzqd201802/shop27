<template>
  <view>
    <block v-if="computedData.cartLength > 0">
      <!-- 1.0 顶部地址选择 -->
      <view class="cart-top" @tap="chooseAddressHandle">
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
          <view class="ware-item" @tap="gotoDetail(item.goods_id)">
            <!-- 2.0.2 左边按钮 -->
            <view class="choice-button">
              <view 
                class="iconfont" 
                :class="item.selected ? 'icon-xuanze-fill' : 'icon-xuanze'"
                @tap.stop="changeSelected(item.goods_id,item.selected)"
              ></view>
            </view>
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
                    <div class="rect" @tap.stop="changeCount(item.goods_id, -1)">-</div>
                    <div class="number">{{ item.count }}</div>
                    <div class="rect" @tap.stop="changeCount(item.goods_id, 1)">+</div>
                  </div>
                </div>
              </view>
            </div>
          </view>
        </block>
      </view>
      <!-- 3.0 底部固定条 -->
      <div class="cart-total">
        <view class="total-button"
          @tap="allSelected(computedData.cartLength===computedData.allCount)"
        >
          <view class="iconfont" 
          :class="computedData.cartLength===computedData.allCount ? 'icon-xuanze-fill' : 'icon-xuanze'"
          ></view>
          全选
        </view>
        <view class="total-center">
          <view>合计:<text class="color-red">￥ {{ computedData.allPrice }}</text> </view>
          <div class="price-tips">包含运费</div>
        </view>
        <view class="accounts" @tap="gotoPay">
          结算({{ computedData.allCount }})
        </view>
      </div>
    </block>
    <block v-else>
      <view class="cart-empty-wrap">
        <image class="cart-empty" src="/static/images/cart_empty.svg" mode="aspectFill"></image>
        <navigator
          url="/pages/index/main"
          open-type="switchTab"
          hover-class="none">
          去首页看看
        </navigator>
      </view>
    </block>
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
      // computed 会监听购物车列表数据的变化，在变化的同时，修改本地存储
      wx.setStorageSync('cartList', this.cartList );
      // 总金额返回值
      return {
        allPrice: _allPrice,
        allCount: _allCount,
        cartLength: _cartLength
      };
      // return _allCount;
    },
    // // 计算选中商品的数量
    // allCount(){
    //   // 初始化价格为 0 
    //   let _allCount = 0;
    //   // 遍历购物车数据中哪些商品被选中了，计算总金额
    //   for(let key in this.cartList){
    //     let item = this.cartList[key];
    //     // 如果遍历到的元素为选中状态，才计算
    //     if(item.selected){
    //       // 价格 * 数量
    //       // _allPrice += item.goods_price * item.count;
    //       _allCount++;
    //     }
    //   }
    //   // 总金额返回值
    //   return _allCount;
    // }
  },
  // 生命周期函数
  onShow(){
    console.log("onShow");
    // 1.0.5 页面显示的时候获取收货地址
    this.address = wx.getStorageSync('address') || {};
    // 2.0.1 购物车列表获取
    this.cartList = wx.getStorageSync('cartList') || {};
  },
  methods:{
    // 1.0 选择收获地址
    chooseAddressHandle(){
      wx.chooseAddress({
        // 1.0.1 这个地方要使用箭头函数
        success:(res)=> {
          // 1.0.2 解构收获地址的信息
          let {provinceName,cityName,countyName,detailInfo,userName,telNumber} = res;
          // 1.0.3 地址信息数据绑定
          this.address = {
            username: userName,
            tel: telNumber,
            addressInfo: `${provinceName}${cityName}${countyName}${detailInfo}`
          }
          // 1.0.4 添加到本地存储
          wx.setStorageSync('address', this.address);
        }
      });
    },
    // 2.0 点击跳转到详情页
    gotoDetail(id){
      wx.navigateTo({ url: '/pages/goods_detail/main?goods_id='+id });
    },
    // 3.0 点击商品数量增加或减少
    changeCount(id , num){
      // 3.0.1 修改商品数量
      this.cartList[id].count += num;
      // 3.0.2 如果数据减少到 0，提示是否删除
      if(this.cartList[id].count === 0){
        // 3.0.3 弹出模态窗口
        wx.showModal({
          title: '提示', //提示的标题,
          content: '是否删除当前商品', //提示的内容,
          showCancel: true, //是否显示取消按钮,
          confirmText: '删除', //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#f00', //确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
              // MpVue 有 bug，删除对象的时候，数据发生了变化，但是视图无法更新
              // 怎么解决这个 bug，把要删除的数据先改一下再删除才可以
              this.cartList[id].count = 1;
              delete this.cartList[id];

              console.log(this.cartList);

            } else if (res.cancel) {
              this.cartList[id].count = 1;
             
            }
          }
        });
      }
    },
    // 4.0 点击选择图标，切换选中状态
    changeSelected(id,bl){
      // 把当前的选中状态取反再重新赋值
      this.cartList[id].selected = !bl;
    },
    // 5.0 点击全选按钮修改列表状态
    allSelected(bl){
      // console.log(bl);
      for(let key in this.cartList){
        let item = this.cartList[key];
        item.selected = !bl;
      }
    },
    // 6.0 跳转到结算支付页面
    gotoPay(){
      wx.navigateTo({ url: '/pages/pay/main' });
    },
  }
}
</script>

<style lang="scss">
.cart-empty-wrap{
  // width: 750rpx;
  position: fixed;
  left:0;
  top:0;
  bottom:0;
  right:0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:#ff2d4a;
}
.cart-empty{
  width: 200rpx;
  height: 200rpx;
}

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
