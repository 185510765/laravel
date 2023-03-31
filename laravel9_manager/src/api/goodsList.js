import request from '@/utils/request';

export function getGoodsList(data) {
  return request({
    url: '/manager/LedianExchangeGoods/getGoodsList',
    method: 'post',
    data,
  });
}

export function sort(data) {
  return request({
    url: '/manager/LedianExchangeGoods/sort',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/LedianExchangeGoods/switchToggle',
    method: 'post',
    data,
  });
}

export function uploadImg(data) {
  return request({
    url: '/manager/LedianExchangeGoods/uploadImg',
    method: 'post',
    data,
  });
}

export function addGoods(data) {
  return request({
    url: '/manager/LedianExchangeGoods/addGoods',
    method: 'post',
    data,
  });
}

export function delGoods(data) {
  return request({
    url: '/manager/LedianExchangeGoods/delGoods',
    method: 'post',
    data,
  });
}

export function editGoods(data) {
  return request({
    url: '/manager/LedianExchangeGoods/editGoods',
    method: 'post',
    data,
  });
}

// *************************************************************************

export function getList(data) {
  return request({
    url: '/goodsList/getList',
    method: 'post',
    data,
  });
}
