import request from '@/utils/request';
import { encryptedData } from '@/utils/encrypt';
import { loginRSA, tokenName } from '@/config';

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: '/manager/SysUser/login',
    method: 'post',
    data,
  });
}

export function getUserInfo(accessToken) {
  return request({
    url: '/manager/SysUser/userInfo',
    method: 'post',
    data: {
      [tokenName]: accessToken,
    },
  });
}

export function logout() {
  return request({
    url: '/manager/SysUser/logout',
    method: 'post',
  });
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  });
}
