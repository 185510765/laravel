import request from '@/utils/request';

export function getPayRecordList(data) {
  return request({
    url: '/manager/PayOrderRecordList/getPayRecordList',
    method: 'post',
    data,
  });
}

export function uploadPayImg(data) {
  return request({
    url: '/manager/PayOrderRecordList/uploadPayImg',
    method: 'post',
    data,
  });
}

export function undo(data) {
  return request({
    url: '/manager/PayOrderRecordList/undo',
    method: 'post',
    data,
  });
}

export function payBefore(data) {
  return request({
    url: '/manager/PayOrderRecordList/payBefore',
    method: 'post',
    data,
  });
}

export function pay(data) {
  return request({
    url: '/manager/PayOrderRecordList/pay',
    method: 'post',
    data,
  });
}
