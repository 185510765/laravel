import request from '@/utils/request';

export function getSysUserList(data) {
  return request({
    url: '/manager/SysUser/getSysUserList',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/SysUser/switchToggle',
    method: 'post',
    data,
  });
}

export function addSysUser(data) {
  return request({
    url: '/manager/SysUser/addSysUser',
    method: 'post',
    data,
  });
}

export function editSysUser(data) {
  return request({
    url: '/manager/SysUser/editSysUser',
    method: 'post',
    data,
  });
}

export function delSysUser(data) {
  return request({
    url: '/manager/SysUser/delSysUser',
    method: 'post',
    data,
  });
}
