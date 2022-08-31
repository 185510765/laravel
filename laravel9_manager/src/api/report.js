import request from '@/utils/request';

export function getReportList(data) {
  return request({
    url: '/manager/MyGameRecord/getReportList',
    method: 'post',
    data,
  });
}

export function deal(data) {
  return request({
    url: '/manager/MyGameRecord/deal',
    method: 'post',
    data,
  });
}

export function batchDeal(data) {
  return request({
    url: '/manager/MyGameRecord/batchDeal',
    method: 'post',
    data,
  });
}

export function getMatchList(data) {
  return request({
    url: '/manager/MyGameList/getMatchList',
    method: 'post',
    data,
  });
}

export function switchStatusToggle(data) {
  return request({
    url: '/manager/MyGameList/switchStatusToggle',
    method: 'post',
    data,
  });
}

export function addGameList(data) {
  return request({
    url: '/manager/MyGameList/addGameList',
    method: 'post',
    data,
  });
}

export function delGameList(data) {
  return request({
    url: '/manager/MyGameList/delGameList',
    method: 'post',
    data,
  });
}

export function editGameList(data) {
  return request({
    url: '/manager/MyGameList/editGameList',
    method: 'post',
    data,
  });
}

export function getRecordGameList(data) {
  return request({
    url: '/manager/MyGameRecord/getRecordGameList',
    method: 'post',
    data,
  });
}
