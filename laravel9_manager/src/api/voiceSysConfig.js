import request from '@/utils/request';

export function getVoiceList(data) {
  return request({
    url: '/manager/VoiceSysConfig/getVoiceList',
    method: 'post',
    data,
  });
}

export function addVoiceSysConfigSubmit(data) {
  return request({
    url: '/manager/VoiceSysConfig/addVoiceSysConfigSubmit',
    method: 'post',
    data,
  });
}

export function delVoice(data) {
  return request({
    url: '/manager/VoiceSysConfig/delVoice',
    method: 'post',
    data,
  });
}

export function editVoice(data) {
  return request({
    url: '/manager/VoiceSysConfig/editVoice',
    method: 'post',
    data,
  });
}
