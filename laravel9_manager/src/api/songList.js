import request from '@/utils/request';

export function getTabList(data) {
  return request({
    url: '/manager/MusicSheetList/getTabList?type=musicdata',
    method: 'post',
    data,
  });
}

export function tabDragEnd(data) {
  return request({
    url: '/manager/MusicSheetList/tabDragEnd?type=musicdata',
    method: 'post',
    data,
  });
}

export function tabAdd(data) {
  return request({
    url: '/manager/MusicSheetList/tabAdd?type=musicdata',
    method: 'post',
    data,
  });
}

export function tabDel(data) {
  return request({
    url: '/manager/MusicSheetList/tabDel?type=musicdata',
    method: 'post',
    data,
  });
}

export function tabEdit(data) {
  return request({
    url: '/manager/MusicSheetList/tabEdit?type=musicdata',
    method: 'post',
    data,
  });
}

export function getSheetList(data) {
  return request({
    url: '/manager/MusicSheetList/getSheetList?type=musicdata',
    method: 'post',
    data,
  });
}

export function getSongList(data) {
  return request({
    url: '/manager/MusicSheetList/getSongList?type=musicdata',
    method: 'post',
    data,
  });
}

export function sheetSort(data) {
  return request({
    url: '/manager/MusicSheetList/sheetSort?type=musicdata',
    method: 'post',
    data,
  });
}

export function bannerSheetSort(data) {
  return request({
    url: '/manager/MusicSheetList/bannerSheetSort?type=musicdata',
    method: 'post',
    data,
  });
}

export function recommendSheetSort(data) {
  return request({
    url: '/manager/MusicSheetList/recommendSheetSort?type=musicdata',
    method: 'post',
    data,
  });
}

export function addSheet(data) {
  return request({
    url: '/manager/MusicSheetList/addSheet?type=musicdata',
    method: 'post',
    data,
  });
}

export function delSheet(data) {
  return request({
    url: '/manager/MusicSheetList/delSheet?type=musicdata',
    method: 'post',
    data,
  });
}

export function editSheet(data) {
  return request({
    url: '/manager/MusicSheetList/editSheet?type=musicdata',
    method: 'post',
    data,
  });
}

export function getSheetMusicList(data) {
  return request({
    url: '/manager/MusicSheetList/getSheetMusicList?type=musicdata',
    method: 'post',
    data,
  });
}

export function musicSort(data) {
  return request({
    url: '/manager/MusicSheetList/musicSort?type=musicdata',
    method: 'post',
    data,
  });
}

export function collectMusic(data) {
  return request({
    url: '/manager/MusicSheetList/collectMusic?type=musicdata',
    method: 'post',
    data,
  });
}

export function delMusic(data) {
  return request({
    url: '/manager/MusicSheetList/delMusic?type=musicdata',
    method: 'post',
    data,
  });
}
