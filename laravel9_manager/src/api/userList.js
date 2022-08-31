import request from '@/utils/request';

export function getUserList(data) {
  return request({
    url: '/manager/User/getUserList',
    method: 'post',
    data,
  });
}

export function getUserMinerList(data) {
  return request({
    url: '/manager/User/getUserMinerList',
    method: 'post',
    data,
  });
}

export function editIntegration(data) {
  return request({
    url: '/manager/User/editIntegration',
    method: 'post',
    data,
  });
}
