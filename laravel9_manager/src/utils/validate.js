/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 校验密码是否小于6位
 * @param str
 * @returns {boolean}
 */
export function isPassword(str) {
  return str.length >= 6;
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否为数字
 * @param value
 * @returns {boolean}
 */
export function isNumber(value) {
  const reg = /^[0-9]*$/;
  return reg.test(value);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是名称
 * @param value
 * @returns {boolean}
 */
export function isName(value) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
  return reg.test(value);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否为IP
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是传统网站
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是小写字母
 * @param str
 * @returns {boolean}
 */
export function isLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是大写字母
 * @param str
 * @returns {boolean}
 */
export function isUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是大写字母开头
 * @param str
 * @returns {boolean}
 */
export function isAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是字符串
 * @param str
 * @returns {boolean}
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是数组
 * @param arg
 * @returns {arg is any[]|boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是端口号
 * @param str
 * @returns {boolean}
 */
export function isPort(str) {
  const reg =
    /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是手机号
 * @param str
 * @returns {boolean}
 */
export function isPhone(str) {
  const reg = /^1\d{10}$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是身份证号(第二代)
 * @param str
 * @returns {boolean}
 */
export function isIdCard(str) {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否是邮箱
 * @param str
 * @returns {boolean}
 */
export function isEmail(str) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否中文
 * @param str
 * @returns {boolean}
 */
export function isChina(str) {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否为空
 * @param str
 * @returns {boolean}
 */
export function isBlank(str) {
  return (
    str == null ||
    false ||
    str === '' ||
    str.trim() === '' ||
    str.toLocaleLowerCase().trim() === 'null'
  );
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否为固话
 * @param str
 * @returns {boolean}
 */
export function isTel(str) {
  const reg =
    /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
  return reg.test(str);
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 判断是否为数字且最多两位小数
 * @param str
 * @returns {boolean}
 */
export function isNum(str) {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(str);
}

// ============================================================================

/**
 * Created by xiaodi on 2021/3/1.
 */

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @copyright xiaodi 185510765@qq.com
 * @description 判断用户名 5-50位数字字母下划线
 * @param str
 * @returns {boolean}
 */
export function isUserName(str) {
  const reg = /^[a-zA-z0-9_]{5,50}$/;
  return reg.test(str);
}

/**
 * @description 判断验证码长度是不是4位
 * @param str
 * @returns {boolean}
 */
export function isCode(str) {
  return str.length === 4;
}

/**
 * @description 判断手机验证码长度是不是6位
 * @param str
 * @returns {boolean}
 */
export function isPhoneCode(str) {
  return str.length === 6;
}

/**
 * @description 判断1-100 以内整数
 * @param str
 * @returns {boolean}
 */
export function isIntRange(num) {
  const reg = /^([1-9][0-9]{0,1}|0|100)$/;
  return reg.test(num);
}

/**
 * @description 判断1-1000 以内整数
 * @param str
 * @returns {boolean}
 */
export function isIntRangeOneThousand(num) {
  const reg = /^([1-9][0-9]{0,2}|0|1000)$/;
  return reg.test(num);
}

/**
 * @description 判断是否是QQ号
 * @param num
 * @returns {boolean}
 */
export function isQQ(num) {
  const reg = /^[1-9][0-9]{4,}$/;
  return reg.test(num);
}

/**
 * @description 判断是否是钱
 * @param num
 * @returns {boolean}
 */
export function isMoney(num) {
  const reg = /^[0-9]{1,}.[0-9]{1,2}$|^[0-9]{1,}$/;
  return reg.test(num);
}

/**
 * @description 判断是否是日期
 * @param str
 * @returns {boolean}
 */
export function isDate(str) {
  const reg = /^2[0-9]{3}-([1-9]|0[0-9]|1[0-2])-([1-9]|1[0-9]|2[0-9]|3[0-1])$/;
  return reg.test(str);
}

/**
 * @description 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObj(obj) {
  return JSON.stringify(obj) === '{}';
}

// 判断字符是否为空的方法
export function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj == null || obj === '') {
    return true;
  } else {
    return false;
  }
}

/**
 * @description 验证对象里面的值 是否有true
 * @param obj
 * @returns {boolean}
 */
export function isHasTrueObj(obj) {
  let bRet = false;
  for (const key in obj) {
    if (obj[key] === true) {
      bRet = true;
    }
  }
  return bRet;
}

// 判断是否是json
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------------------------

/**
 * @copyright xiaodi 185510765@qq.com
 * @description 判断是否为数字且最多两位小数
 * @param str
 * @returns {boolean}
 */
export function isNumFloat(str) {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(str);
}

/**
 * @copyright xiaodi 185510765@qq.com
 * @description 判断经度 -180.0～+180.0（整数部分为0～180，必须输入1到5位小数）
 * @param str
 * @returns {boolean}
 */
export function isLongitude(str) {
  const reg = /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/;
  return reg.test(str);
}

/**
 * @copyright xiaodi 185510765@qq.com
 * @description 判断纬度 -90.0～+90.0（整数部分为0～90，必须输入1到5位小数）
 * @param str
 * @returns {boolean}
 */
export function isLatitude(str) {
  const reg = /^[-|+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
  return reg.test(str);
}

/**
 * @copyright xiaodi 185510765@qq.com
 * @description rtsp校验，只要有rtsp://
 * @param str
 * @returns {boolean}
 */
export function isRTSP(str) {
  const reg =
    /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  const reg1 =
    /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):[0-9]{1,5}/;
  const reg2 =
    /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\//;
  return reg.test(str) || reg1.test(str) || reg2.test(str);
}

/**
 * @copyright xiaodi 185510765@qq.com
 * @description 判断折扣 0~1 之间
 * @param str
 * @returns {boolean}
 */
export function isDiscount(str) {
  // const reg = /^(0\.[1-9]{1,2})$/;
  const reg = /^(0\.[0-9]{1,2})$/;
  return reg.test(str);
}
