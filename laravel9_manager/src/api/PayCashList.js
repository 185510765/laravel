import request from '@/utils/request';

export function getTixianApplyList(data) {
  return request({
    url: '/manager/PayCashList/getTixianApplyList',
    method: 'post',
    data,
  });
}

export function tixianCheck(data) {
  return request({
    url: '/manager/PayCashList/tixianCheck',
    method: 'post',
    data,
  });
}
