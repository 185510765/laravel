import request from '@/utils/request';

export function getTixianApplyList(data) {
  return request({
    url: '/manager/Tixian/getTixianApplyList',
    method: 'data',
    data,
  });
}
