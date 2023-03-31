import request from '@/utils/request';

export function getUserList(data) {
  return request({
    url: '/manager/UserGame/getUserList',
    method: 'post',
    data,
  });
}

export function getUserGameList(data) {
  return request({
    url: '/manager/UserGame/getUserGameList',
    method: 'post',
    data,
  });
}

export function getGameRecordList(data) {
  return request({
    url: '/manager/UserGame/getGameRecordList',
    method: 'post',
    data,
  });
}

export function getGamePathList(data) {
  return request({
    url: '/manager/UserGame/getGamePathList',
    method: 'post',
    data,
  });
}
