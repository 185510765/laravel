const setting = require('./setting.config');

const network = {
  // 默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
  baseURL:
    process.env.NODE_ENV === 'development'
      ? // ? 'http://127.0.0.1/game_api/smallGame' // 开发环境    http://127.0.0.1:8081/smallGame/papi
        // : setting.webpackDomain,

        // : 'https://gtest.huayangduo.cn', // 线上测试环境  https://gtest.huayangduo.cn   https://gtest.huayangduo.cn/admin/papi
        // 'https://game.huayangduo.cn', // 线上测试环境  https://gtest.huayangduo.cn   https://gtest.huayangduo.cn/admin/papi

        'http://127.0.0.1/laravel/laravel9/public' // 开发环境    laravel 环境
      : 'https://gtest.huayangduo.cn', // 正式环境

  // getBaseApi(process.env.NODE_ENV), // 自己修改 加上环境变量文件
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  // requestTimeout: 5000,
  requestTimeout: 30000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 600, 0],
  //登录失效code
  invalidCode: 401,
  //无权限code
  noPermissionCode: 403,
};
module.exports = network;

// console.log(setting.outputDir);
// console.log(setting.webpackDomain);
// console.log(network.baseURL);

/**
 * @description: 获取接口api地址
 * @param {*} flag
 * @return {*}
 */
function getBaseApi(flag) {
  console.log(flag);

  let api = 'http://127.0.0.1:8081/admin/papi'; // 本地地址

  switch (flag) {
    case 'debug': // 测试环境 老的花样多
      api = 'http://47.101.69.179:8081/admin/papi';
      break;
    case 'release': // 正式环境 新的花样多
      api = 'https://api.yxje.com:8081/admin/papi';
      break;
    case 'production': // 正式环境 新的花样多
      api = 'https://api.yxje.com:8081/admin/papi';
      break;
  }

  console.log(api);

  return api;
}
