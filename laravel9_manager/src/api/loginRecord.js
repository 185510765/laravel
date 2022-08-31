import request from '@/utils/request';

export function getRecordList(data) {
  return request({
    url: '/manager/LoginRecord/getRecordList',
    method: 'post',
    data,
  });
}

export function getUserMinerList(data) {
  return request({
    url: '/manager/LoginRecord/getUserMinerList',
    method: 'post',
    data,
  });
}

export function editIntegration(data) {
  return request({
    url: '/manager/LoginRecord/editIntegration',
    method: 'post',
    data,
  });
}
