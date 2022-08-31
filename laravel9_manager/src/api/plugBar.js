import request from '@/utils/request';

export function getPlugBarList(data) {
  return request({
    url: '/manager/PlugBar/getPlugBarList',
    method: 'post',
    data,
  });
}

export function getPlugClassAndVersion(data) {
  return request({
    url: '/manager/PlugBar/getPlugClassAndVersion',
    method: 'post',
    data,
  });
}

export function addPlugBar(data) {
  return request({
    url: '/manager/PlugBar/addPlugBar',
    method: 'post',
    data,
  });
}

export function delPlugBar(data) {
  return request({
    url: '/manager/PlugBar/delPlugBar',
    method: 'post',
    data,
  });
}

export function copyPlugConfig(data) {
  return request({
    url: '/manager/PlugBar/copyPlugConfig',
    method: 'post',
    data,
  });
}

export function editPlugBar(data) {
  return request({
    url: '/manager/PlugBar/editPlugBar',
    method: 'post',
    data,
  });
}
