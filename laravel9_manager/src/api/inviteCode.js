/*
 * @Description:
 * @Author: 溜达
 * @Date: 2022-04-14 17:16:05
 * @LastEditors: 溜达
 * @LastEditTime: 2022-04-15 13:56:11
 * @FilePath: \funplayManager\src\api\inviteCode.js
 */
import request from '@/utils/request';

export function getInviteList(data) {
  return request({
    url: '/manager/InviteList/getInviteList',
    method: 'post',
    data,
  });
}

export function addInviteCode(data) {
  return request({
    url: '/manager/InviteList/addInviteCode',
    method: 'post',
    data,
  });
}

export function delayInviteCode(data) {
  return request({
    url: '/manager/InviteList/delayInviteCode',
    method: 'post',
    data,
  });
}

export function abandon(data) {
  return request({
    url: '/manager/InviteList/abandon',
    method: 'post',
    data,
  });
}
