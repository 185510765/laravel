/*
 * @Description:
 * @Author: 溜达
 * @Date: 2022-04-09 10:46:34
 * @LastEditors: 溜达
 * @LastEditTime: 2022-04-09 15:10:59
 * @FilePath: \funplayManager\src\api\plugArea.js
 */

import request from '@/utils/request';

export function getPlugAreaList(data) {
  return request({
    url: '/manager/PlugArea/getPlugAreaList',
    method: 'post',
    data,
  });
}

export function getPlugClassAndVersion(data) {
  return request({
    url: '/manager/PlugArea/getPlugClassAndVersion',
    method: 'post',
    data,
  });
}

export function findAreaName(data) {
  return request({
    url: '/manager/PlugArea/findAreaName',
    method: 'post',
    data,
  });
}

export function getPlugBarList(data) {
  return request({
    url: '/manager/PlugArea/getPlugBarList',
    method: 'post',
    data,
  });
}

export function plugBarIdChange(data) {
  return request({
    url: '/manager/PlugArea/plugBarIdChange',
    method: 'post',
    data,
  });
}

export function addPlugArea(data) {
  return request({
    url: '/manager/PlugArea/addPlugArea',
    method: 'post',
    data,
  });
}

export function delPlugArea(data) {
  return request({
    url: '/manager/PlugArea/delPlugArea',
    method: 'post',
    data,
  });
}

export function editPlugArea(data) {
  return request({
    url: '/manager/PlugArea/editPlugArea',
    method: 'post',
    data,
  });
}
