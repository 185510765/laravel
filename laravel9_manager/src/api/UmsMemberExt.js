import request from '@/utils/request';

export function getPaymentApplyList(data) {
  return request({
    url: '/manager/UmsMemberExt/getPaymentApplyList',
    method: 'post',
    data,
  });
}

export function paymentCheck(data) {
  return request({
    url: '/manager/UmsMemberExt/paymentCheck',
    method: 'post',
    data,
  });
}
