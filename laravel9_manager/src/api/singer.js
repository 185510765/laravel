import request from '@/utils/request';

export function getSingerList(data) {
  return request({
    url: '/manager/MusicArtistList/getSingerList?type=musicdata',
    method: 'post',
    data,
  });
}

export function addSinger(data) {
  return request({
    url: '/manager/MusicArtistList/addSinger?type=musicdata',
    method: 'post',
    data,
  });
}

export function delSinger(data) {
  return request({
    url: '/manager/MusicArtistList/delSinger?type=musicdata',
    method: 'post',
    data,
  });
}

export function editSinger(data) {
  return request({
    url: '/manager/MusicArtistList/editSinger?type=musicdata',
    method: 'post',
    data,
  });
}

export function sort(data) {
  return request({
    url: '/manager/MusicArtistList/sort?type=musicdata',
    method: 'post',
    data,
  });
}

export function getSingerMusicList(data) {
  return request({
    url: '/manager/MusicArtistList/getSingerMusicList?type=musicdata',
    method: 'post',
    data,
  });
}
