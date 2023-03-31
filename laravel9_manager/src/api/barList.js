import request from '@/utils/request';

export function getBarList(data) {
  return request({
    url: '/manager/UmsNetbar/getBarList',
    method: 'post',
    data,
  });
}

export function plugConfigTypeChange(data) {
  return request({
    url: '/manager/UmsNetbar/plugConfigTypeChange',
    method: 'post',
    data,
  });
}

export function getPlugBarList(data) {
  return request({
    url: '/manager/UmsNetbar/getPlugBarList',
    method: 'post',
    data,
  });
}

export function plugBarIdChange(data) {
  return request({
    url: '/manager/UmsNetbar/plugBarIdChange',
    method: 'post',
    data,
  });
}

export function getBarSqlPwd(data) {
  return request({
    url: '/manager/UmsNetbar/getBarSqlPwd',
    method: 'post',
    data,
  });
}

export function EditPayConfig(data) {
  return request({
    url: '/manager/UmsNetbar/EditPayConfig',
    method: 'post',
    data,
  });
}

export function restartPlug(data) {
  return request({
    url: '/manager/UmsNetbar/restartPlug',
    method: 'post',
    data,
  });
}

export function editDebug(data) {
  return request({
    url: '/manager/UmsNetbar/editDebug',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/UmsNetbar/switchToggle',
    method: 'post',
    data,
  });
}

export function getBarHouseList(data) {
  return request({
    url: '/manager/UmsNetbar/getBarHouseList',
    method: 'post',
    data,
  });
}

export function barDeviceSave(data) {
  return request({
    url: '/manager/UmsNetbar/barDeviceSave',
    method: 'post',
    data,
  });
}

export function switchPrintGameLog(data) {
  return request({
    url: '/manager/UmsNetbar/switchPrintGameLog',
    method: 'post',
    data,
  });
}
