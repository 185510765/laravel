/* 自定义方法 */
import Vue from 'vue';

// 重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值得属性
Vue.prototype.$reset = function (formRef, ...excludeFields) {
  if (this.$refs[formRef] !== undefined) {
    this.$refs[formRef].resetFields();
  }
  // let obj1 = this.$data;
  // let obj2 = this.$options.data.call(this);
  // console.log(obj1);
  // console.log(obj2);
  // if (!excludeFields || excludeFields.length === 0) {
  //   excludeFields = ['ruleValidate'];
  // }
  // for (let attrName in obj1) {
  //   if (excludeFields && excludeFields.includes(attrName)) {
  //     continue;
  //   }
  //   obj1[attrName] = obj2[attrName];
  // }
};

import '@/static/common/css/common.css';
import '@/static/common/css/normalize.css';
import '@/static/iconfont/iconfont.css';

// 表单验证
// import * as rule from '@/utils/rule.js';
// Vue.prototype.$rule = rule;

// // 右键菜单
// import contentmenu from 'v-contextmenu';
// import 'v-contextmenu/dist/index.css';

// Vue.use(contentmenu);
