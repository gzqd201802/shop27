<template>
  <view>
    <!-- 注意，授权登录的事件需要用  @getuserinfo，并且指定 open-type="getUserInfo" -->
    <button type="primary" open-type="getUserInfo" @getuserinfo="getToken">授权登录</button>
  </view>
</template>

<script>
import { userLogin } from "@/api";
export default {
  data () {
    
  },
  methods:{
    // 1.0 登录换取 token 的方法
    getToken(e){
      // 1.0.1 获取登录需要的用户信息
      const {encryptedData,iv,rawData,signature} = e.mp.detail;
      // 测试输出所有授权需要信息
      console.log(encryptedData,iv,rawData,signature);
      // 1.0.2  获取 code 信息
      wx.login({
        // 1.0.3 获取成功的回调函数
        success: res => {
          // 1.0.4 获取 code 信息
          const {code} =  res;
          // 1.0.5 把 <5个用户信息参数> 发送到服务器，
          userLogin({
            code,
            encryptedData,
            iv,
            rawData,
            signature
          }).then(res=>{ 
            // 1.0.6 如果服务器校验成功，获取 token
            const {token} = res.data.message;
              // 1.0.7 把 token 保存到本地
              wx.setStorageSync('token',token);
              // 1.0.8 获取 token 成功后，返回授权前的页面
              wx.navigateBack({ delta: 1 });
          }) 
        }
      }); // end  1.0.2
    } // end 1.0
  }

}
</script>

<style>
/* 最终编译成 WXSS */

</style>
