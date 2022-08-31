import request from '@/utils/request';

export function addArtist(data) {
  return request({
    url: '/manager/MusicArtistList/addArtist?type=musicdata',
    method: 'post',
    data,
  });
}
