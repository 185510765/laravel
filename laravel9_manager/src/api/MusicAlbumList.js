import request from '@/utils/request';

export function addAlbum(data) {
  return request({
    url: '/manager/MusicAlbumList/addAlbum?type=musicdata',
    method: 'post',
    data,
  });
}
