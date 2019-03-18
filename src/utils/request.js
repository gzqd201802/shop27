// 封装小程序请求的方法

// 开放四个必要参数，路径，data参数，请求头，请求方式
function request(url, data = {}, header = {}, method = "GET") {
    // 函数内部返回一个 Promise 对象
    // resolve  成功时候执行的回调函数
    // reject   失败时候执行的回调函数
    return new Promise((resolve,reject)=>{
        wx.request({
            url,
            data,
            method,
            header,
            success: res => {
                resolve(res);
            },
            fail: () => {
                reject();
            }
          });
    });
}
// 1.0 k可以通过  request('路径').then() 实现请求

// 把封装的 request 导出，方便其他页面导入
// export default   导出默认，一般是导出一个对象，导入的时候不需要带花括号
// export           普通导出，页面导入的时候需要 {}
export default request;

