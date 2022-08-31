import request from '@/utils/request';

export function getMinerList(data) {
  return request({
    url: '/manager/UserMiner/getMinerList',
    method: 'post',
    data,
  });
}

export function changeLevel(data) {
  return request({
    url: '/manager/UserMiner/changeLevel',
    method: 'post',
    data,
  });
}
