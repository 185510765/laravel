/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split('&');
  searchArr.forEach((v) => {
    const index = v.indexOf('=');
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 *  计算页面宽高比例 铺满页面
 * @param {*} element     外层div element
 * @param {*} obj         图片的宽高左边距新宽高对象
 * @return {*}
 */
// function resizeImg(element, obj) {
export function resizeImg(elementWidth, obj) {
  // 比例
  var proportion = Math.floor((obj.height / obj.width) * 100) / 100;

  // var nTotalWidth = elementWidth - 28;
  var nTotalWidth = elementWidth - 22;

  // console.log(nTotalWidth);
  // 一行可存放的商品数
  var nOneWidth = obj.width + obj.marginleft;
  var nCount = Math.floor(nTotalWidth / nOneWidth);
  // 计算出一行多出的宽度
  var nMoreWidth = nTotalWidth - nOneWidth * nCount;
  // 计算出新的宽高
  var newWidth = obj.width + Math.floor(nMoreWidth / nCount);
  var newHeight = newWidth * proportion;
  return {
    newWidth: newWidth - 1,
    newHeight: newHeight,
  };
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

// 深拷贝 b不受a影响
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));

  // const _obj = JSON.stringify(obj);
  // const objClone = JSON.parse(_obj);
  // return objClone;
}

// 和上面一样
export function clone(origin) {
  const originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

// 保留指定位数的小数
export function fomatFloat(src, pos) {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
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
 * 格式化时间
  formatDate(new Date().getTime());// 2017-05-12 10:05:44
  formatDate(new Date().getTime(), 'YY年MM月DD日');// 2017年05月12日
  formatDate(new Date().getTime(), '今天是YY/MM/DD hh:mm:ss');// 今天是2017/05/12 10:07:45
 * @param {*} time
 * @param {*} format
 * @return {*}
 */
export function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
  var date = new Date(time);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var // 月份是从0开始的
    day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index;
  });

  var newTime = format
    .replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);

  return newTime;
}

//js获取url传递参数，js获取url？号后面的参数
export function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  if (url != '' && url != null) {
    var theRequest = new Object();
    if (url.indexOf('?') != -1) {
      var str = url.substr(1);
      strs = str.split('&');
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  } else {
    return 0;
  }
}

export function sum() {
  var s = 0;
  for (var i = 0; i < arguments.length; i++) {
    s += parseFloat(arguments[i]);
  }
  s = (s.toFixed(3) * 1000) / 1000;
  return s;
}
