import request from '@/utils/request';

export function getRouterList(data) {
  return request({
    url: '/manager/Menu/navigate',
    method: 'post',
    data,
  });
}
