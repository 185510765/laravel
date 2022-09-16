import request from '@/utils/request';

export function getInitData(data) {
  return request({
    url: '/manager/Index/getInitData',
    method: 'post',
    data,
  });
}
