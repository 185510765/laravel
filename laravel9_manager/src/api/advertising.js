import request from '@/utils/request';

export function getGameAdvertisingList(data) {
  return request({
    url: '/manager/MyGameAdvertising/getGameAdvertisingList',
    method: 'post',
    data,
  });
}

export function sort(data) {
  return request({
    url: '/manager/MyGameAdvertising/sort',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/MyGameAdvertising/switchToggle',
    method: 'post',
    data,
  });
}

export function uploadImg(data) {
  return request({
    url: '/manager/MyGameAdvertising/uploadImg',
    method: 'post',
    data,
  });
}

export function addGameAdvertising(data) {
  return request({
    url: '/manager/MyGameAdvertising/addGameAdvertising',
    method: 'post',
    data,
  });
}

export function delGameAdvertising(data) {
  return request({
    url: '/manager/MyGameAdvertising/delGameAdvertising',
    method: 'post',
    data,
  });
}

export function editGameAdvertising(data) {
  return request({
    url: '/manager/MyGameAdvertising/editGameAdvertising',
    method: 'post',
    data,
  });
}
