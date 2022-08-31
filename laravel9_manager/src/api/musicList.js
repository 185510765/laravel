import request from '@/utils/request';

export function getMusicList(data) {
  return request({
    url: '/manager/MusicItemList/getMusicList?type=musicdata',
    method: 'post',
    data,
  });
}

export function getApiMusicList(data) {
  return request({
    url: '/manager/MusicItemList/getApiMusicList?type=musicdata',
    method: 'post',
    data,
  });
}

export function getMusicUrl(data) {
  return request({
    url: '/manager/MusicItemList/getMusicUrl?type=musicdata',
    method: 'post',
    data,
  });
}

export function getArtistList(data) {
  return request({
    url: '/manager/MusicItemList/getArtistList?type=musicdata',
    method: 'post',
    data,
  });
}

export function getAlbumList(data) {
  return request({
    url: '/manager/MusicItemList/getAlbumList?type=musicdata',
    method: 'post',
    data,
  });
}

export function addMusic(data) {
  return request({
    url: '/manager/MusicItemList/addMusic?type=musicdata',
    method: 'post',
    data,
  });
}

export function delMusic(data) {
  return request({
    url: '/manager/MusicItemList/delMusic?type=musicdata',
    method: 'post',
    data,
  });
}

export function editMusic(data) {
  return request({
    url: '/manager/MusicItemList/editMusic?type=musicdata',
    method: 'post',
    data,
  });
}

export function musicSort(data) {
  return request({
    url: '/manager/MusicItemList/musicSort?type=musicdata',
    method: 'post',
    data,
  });
}

export function collectMusic(data) {
  return request({
    url: '/manager/MusicItemList/collectMusic?type=musicdata',
    method: 'post',
    data,
  });
}

export function musicNoResources(data) {
  return request({
    url: '/manager/MusicItemList/musicNoResources?type=musicdata',
    method: 'post',
    data,
  });
}

export function delNoResourcesMusics(data) {
  return request({
    url: '/manager/MusicItemList/delNoResourcesMusics?type=musicdata',
    method: 'post',
    data,
  });
}
