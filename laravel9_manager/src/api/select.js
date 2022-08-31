import request from '@/utils/request';

export function getVoiceSoundList(data) {
  return request({
    url: '/manager/VoiceSoundList/getVoiceSoundList',
    method: 'post',
    data,
  });
}
