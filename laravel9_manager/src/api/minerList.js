import request from '@/utils/request';

export function getMinerList(data) {
  return request({
    url: '/manager/UserMiner/getMinerList',
    method: 'post',
    data,
  });
}

export function getLevelMiner() {
  return request({
    url: '/manager/UserMiner/getLevelMiner',
    method: 'post',
  });
}

export function changeLevel(data) {
  return request({
    url: '/manager/UserMiner/changeLevel',
    method: 'post',
    data,
  });
}

export function testGold(data) {
  return request({
    url: '/manager/UserMiner/testGold',
    method: 'post',
    data,
  });
}

export function delMiner(data) {
  return request({
    url: '/manager/UserMiner/delMiner',
    method: 'post',
    data,
  });
}
