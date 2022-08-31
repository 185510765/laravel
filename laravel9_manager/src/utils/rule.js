// +----------------------------------------------------------------------
// | description element表单验证规则提示
// +----------------------------------------------------------------------
// | Author: xiaodi <185510765@qq.com>
// +----------------------------------------------------------------------

import * as validate from '@/utils/validate.js';

// 判断用户名 5-50位数字字母下划线
export function checkUserName(rule, value, callback) {
  if (!validate.isUserName(value)) {
    callback(new Error('用户名只支持5-50位数字字母下划线'));
  } else {
    callback();
  }
}

// 密码长度大于6位
export function checkPwd(rule, value, callback) {
  if (!validate.isPassword(value)) {
    callback(new Error('密码长度需大于6位'));
  } else {
    callback();
  }
}

// 判断验证码长度是不是4位
export function checkCodeLength(rule, value, callback) {
  if (!validate.isCode(value)) {
    callback(new Error('请输入4位数的验证码'));
  } else {
    callback();
  }
}

// 判断是不是数字
export function checkSex(rule, value, callback) {
  if (!validate.isNumber(value)) {
    callback(new Error('性别只能是数字'));
  } else {
    callback();
  }
}

// 判断手机验证码是不是6位
export function checkPhoneCode(rule, value, callback) {
  if (!validate.isPhoneCode(value)) {
    callback(new Error('请输入6位数的手机验证码'));
  } else {
    callback();
  }
}

// 判断是否是手机号
export function checkPhone(rule, value, callback) {
  if (!validate.isPhone(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
}

// 判断是否是中文名
export function checkName(rule, value, callback) {
  if (!validate.isChina(value)) {
    callback(new Error('请输入正确的中文名'));
  } else {
    callback();
  }
}

// 判断邮箱
export function checkEmail(rule, value, callback) {
  if (!validate.isEmail(value)) {
    callback(new Error('请输入正确的邮箱'));
  } else {
    callback();
  }
}

// 判断钱
export function checkMoney(rule, value, callback) {
  if (!validate.isMoney(value)) {
    callback(new Error('请输入正确的金额'));
  } else {
    callback();
  }
}

// 判断整数 1-100
export function checkNumber(rule, value, callback) {
  if (!validate.isNumber(value)) {
    callback(new Error('请输入正确的数字'));
  } else {
    callback();
  }
}

// 判断是否是数字
export function checkNum(rule, value, callback) {
  if (!validate.isNum(value)) {
    // callback(new Error('请输入有效的数量'));
    callback(new Error('请输入正整数'));
  } else {
    callback();
  }
}

// 判断是否是折扣
export function checkDiscount(rule, value, callback) {
  if (!validate.isDiscount(value)) {
    callback(new Error('请输入有效的折扣'));
  } else {
    callback();
  }
}

// 判断对象是否为空
export function checkEmptyObj(rule, value, callback) {
  if (!validate.isEmptyObj(value)) {
    callback(new Error('至少选择一种'));
  } else {
    callback();
  }
}

// 验证对象里面的值 是否有true
export function checkHasTrueObj(rule, value, callback) {
  if (!validate.isHasTrueObj(value)) {
    callback(new Error('至少选择一种'));
  } else {
    callback();
  }
}

// 判断KD 是否合法 和钱一样
export function checkKD(rule, value, callback) {
  if (!validate.isMoney(value)) {
    callback(new Error('请输入有效的KD'));
  } else {
    callback();
  }
}

// 判断1~1000以内整数
export function checkProbability(rule, value, callback) {
  if (!validate.isIntRangeOneThousand(value)) {
    callback(new Error('中奖概率请填写1~1000整数'));
  } else {
    callback();
  }
}

// 判断是否是json
export function checkJson(rule, value, callback) {
  if (!validate.isJSON(value)) {
    callback(new Error('数据无效'));
  } else {
    callback();
  }
}
