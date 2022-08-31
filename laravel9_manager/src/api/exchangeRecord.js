import request from '@/utils/request';

export function getRecordList(data) {
  return request({
    url: '/manager/UmsMemberLedianExchangeRecord/getRecordList',
    method: 'post',
    data,
  });
}

export function changeStatus(data) {
  return request({
    url: '/manager/UmsMemberLedianExchangeRecord/changeStatus',
    method: 'post',
    data,
  });
}

export function inputTrackingNumber(data) {
  return request({
    url: '/manager/UmsMemberLedianExchangeRecord/inputTrackingNumber',
    method: 'post',
    data,
  });
}

export function statusChange(data) {
  return request({
    url: '/manager/UmsMemberLedianExchangeRecord/statusChange',
    method: 'post',
    data,
  });
}
