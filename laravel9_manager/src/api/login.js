import request from '@/utils/request';

export function getCaptcha() {
  return request({
    url: '/manager/SysUser/getCaptcha',
    method: 'post',
  });
}
