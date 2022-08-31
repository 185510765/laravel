/*
 * @Description:
 * @Author: 溜达
 * @Date: 2022-04-20 15:48:12
 * @LastEditors: 溜达
 * @LastEditTime: 2022-08-09 10:29:27
 * @FilePath: \smallGameManager\src\api\sysConfig.js
 */
import request from '@/utils/request';

export function getSysConfig(data) {
  return request({
    url: '/manager/SysConfig/getSysConfig',
    method: 'post',
    data,
  });
}

export function minerSave(data) {
  return request({
    url: '/manager/SysConfig/minerSave',
    method: 'post',
    data,
  });
}

export function dogSave(data) {
  return request({
    url: '/manager/SysConfig/dogSave',
    method: 'post',
    data,
  });
}

export function huayangbiSave(data) {
  return request({
    url: '/manager/SysConfig/huayangbiSave',
    method: 'post',
    data,
  });
}

export function touchGoldSave(data) {
  return request({
    url: '/manager/SysConfig/touchGoldSave',
    method: 'post',
    data,
  });
}

export function generalSave(data) {
  return request({
    url: '/manager/SysConfig/generalSave',
    method: 'post',
    data,
  });
}

export function minerConfigSave(data) {
  return request({
    url: '/manager/SysConfig/minerConfigSave',
    method: 'post',
    data,
  });
}

export function minerAttrSave(data) {
  return request({
    url: '/manager/SysConfig/minerAttrSave',
    method: 'post',
    data,
  });
}

export function oreSave(data) {
  return request({
    url: '/manager/SysConfig/oreSave',
    method: 'post',
    data,
  });
}

export function oreSaleTimeSave(data) {
  return request({
    url: '/manager/SysConfig/oreSaleTimeSave',
    method: 'post',
    data,
  });
}

export function huayangbiDigRateSave(data) {
  return request({
    url: '/manager/SysConfig/huayangbiDigRateSave',
    method: 'post',
    data,
  });
}

export function minerRecycleSave(data) {
  return request({
    url: '/manager/SysConfig/minerRecycleSave',
    method: 'post',
    data,
  });
}

// ******************************** 测试 ****************************************
export function getUserInfo() {
  return request({
    url: '/manager/SysConfig/getUserInfo',
    method: 'post',
  });
}

export function bindUserId() {
  return request({
    url: '/manager/SysConfig/bindUserId',
    method: 'post',
  });
}

export function sendUserIdInfo(data) {
  return request({
    url: '/manager/SysConfig/sendUserIdInfo',
    method: 'post',
    data,
  });
}
