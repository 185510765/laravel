import request from '@/utils/request';

export function getHuayangbiRecordList(data) {
  return request({
    url: '/manager/FlowersCoinConfig/getHuayangbiRecordList',
    method: 'post',
    data,
  });
}

export function getFlowersCoinRecordList(data) {
  return request({
    url: '/manager/FlowersCoinConfig/getFlowersCoinRecordList',
    method: 'post',
    data,
  });
}

export function addLimit(data) {
  return request({
    url: '/manager/FlowersCoinConfig/addLimit',
    method: 'post',
    data,
  });
}

export function getInitData(data) {
  return request({
    url: '/manager/FlowersCoinConfig/getInitData',
    method: 'post',
    data,
  });
}

export function editLimit(data) {
  return request({
    url: '/manager/FlowersCoinConfig/editLimit',
    method: 'post',
    data,
  });
}
