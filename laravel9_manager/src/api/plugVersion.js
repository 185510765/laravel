/*
 * @Description:
 * @Author: 溜达
 * @Date: 2022-04-11 09:57:23
 * @LastEditors: 溜达
 * @LastEditTime: 2022-04-14 11:49:51
 * @FilePath: \funplayManager\src\api\plugVersion.js
 */

import request from '@/utils/request';

export function getPlugClassTabList(data) {
  return request({
    url: '/manager/PlugVersion/getPlugClassTabList',
    method: 'post',
    data,
  });
}

export function getPlugVersionTabList(data) {
  return request({
    url: '/manager/PlugVersion/getPlugVersionTabList',
    method: 'post',
    data,
  });
}

export function getPlugFileList(data) {
  return request({
    url: '/manager/PlugVersion/getPlugFileList',
    method: 'post',
    data,
  });
}

export function addPlugClass(data) {
  return request({
    url: '/manager/PlugVersion/addPlugClass',
    method: 'post',
    data,
  });
}

export function delPlugClass(data) {
  return request({
    url: '/manager/PlugVersion/delPlugClass',
    method: 'post',
    data,
  });
}

export function editPlugClass(data) {
  return request({
    url: '/manager/PlugVersion/editPlugClass',
    method: 'post',
    data,
  });
}

export function addPlugVersion(data) {
  return request({
    url: '/manager/PlugVersion/addPlugVersion',
    method: 'post',
    data,
  });
}

export function delPlugVersion(data) {
  return request({
    url: '/manager/PlugVersion/delPlugVersion',
    method: 'post',
    data,
  });
}

export function editPlugVersion(data) {
  return request({
    url: '/manager/PlugVersion/editPlugVersion',
    method: 'post',
    data,
  });
}

export function addPlugFile(data) {
  return request({
    url: '/manager/PlugVersion/addPlugFile',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/PlugVersion/switchToggle',
    method: 'post',
    data,
  });
}

export function delPlugFile(data) {
  return request({
    url: '/manager/PlugVersion/delPlugFile',
    method: 'post',
    data,
  });
}

export function editPlugFile(data) {
  return request({
    url: '/manager/PlugVersion/editPlugFile',
    method: 'post',
    data,
  });
}

export function synchronousBtn(data) {
  return request({
    url: '/manager/PlugVersion/synchronousBtn',
    method: 'post',
    data,
  });
}

export function allSynchronous(data) {
  return request({
    url: '/manager/PlugVersion/allSynchronous',
    method: 'post',
    data,
  });
}

export function copyPlugClass(data) {
  return request({
    url: '/manager/PlugVersion/copyPlugClass',
    method: 'post',
    data,
  });
}

export function copyPlugVersion(data) {
  return request({
    url: '/manager/PlugVersion/copyPlugVersion',
    method: 'post',
    data,
  });
}
