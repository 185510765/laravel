import request from '@/utils/request';

export function getVoiceSoundList(data) {
  return request({
    url: '/manager/VoiceSoundList/getVoiceSoundList',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/VoiceSoundList/switchToggle',
    method: 'post',
    data,
  });
}

export function uploadVoice(data) {
  return request({
    url: '/manager/VoiceSoundList/uploadVoice',
    method: 'post',
    data,
  });
}

export function addVoice(data) {
  return request({
    url: '/manager/VoiceSoundList/addVoice',
    method: 'post',
    data,
  });
}

export function delVoice(data) {
  return request({
    url: '/manager/VoiceSoundList/delVoice',
    method: 'post',
    data,
  });
}

export function editVoice(data) {
  return request({
    url: '/manager/VoiceSoundList/editVoice',
    method: 'post',
    data,
  });
}
