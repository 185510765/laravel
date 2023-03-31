import request from '@/utils/request';

export function getUserList(data) {
  return request({
    url: '/manager/UmsMemberAddress/getUserList',
    method: 'post',
    data,
  });
}

export function getAddressList(data) {
  return request({
    url: '/manager/UmsMemberAddress/getAddressList',
    method: 'post',
    data,
  });
}

export function sort(data) {
  return request({
    url: '/manager/UmsMemberAddress/sort',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/UmsMemberAddress/switchToggle',
    method: 'post',
    data,
  });
}

export function uploadImg(data) {
  return request({
    url: '/manager/UmsMemberAddress/uploadImg',
    method: 'post',
    data,
  });
}

export function addAddress(data) {
  return request({
    url: '/manager/UmsMemberAddress/addAddress',
    method: 'post',
    data,
  });
}

export function delAddress(data) {
  return request({
    url: '/manager/UmsMemberAddress/delAddress',
    method: 'post',
    data,
  });
}

export function editAddress(data) {
  return request({
    url: '/manager/UmsMemberAddress/editAddress',
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
