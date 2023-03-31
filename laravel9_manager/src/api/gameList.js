import request from '@/utils/request';

export function getTabList(data) {
  return request({
    url: '/manager/MyGameResources/getTabList',
    method: 'post',
    data,
  });
}

export function tabAdd(data) {
  return request({
    url: '/manager/MyGameResources/tabAdd',
    method: 'post',
    data,
  });
}

export function tabDel(data) {
  return request({
    url: '/manager/MyGameResources/tabDel',
    method: 'post',
    data,
  });
}

export function tabEdit(data) {
  return request({
    url: '/manager/MyGameResources/tabEdit',
    method: 'post',
    data,
  });
}

export function getGameList(data) {
  return request({
    url: '/manager/MyGameResources/getGameList',
    method: 'post',
    data,
  });
}

export function gameSort(data) {
  return request({
    url: '/manager/MyGameResources/gameSort',
    method: 'post',
    data,
  });
}

export function switchToggle(data) {
  return request({
    url: '/manager/MyGameResources/switchToggle',
    method: 'post',
    data,
  });
}

export function addGame(data) {
  return request({
    url: '/manager/MyGameResources/addGame',
    method: 'post',
    data,
  });
}

export function delGame(data) {
  return request({
    url: '/manager/MyGameResources/delGame',
    method: 'post',
    data,
  });
}

export function editGame(data) {
  return request({
    url: '/manager/MyGameResources/editGame',
    method: 'post',
    data,
  });
}

export function editStart(data) {
  return request({
    url: '/manager/MyGameResources/editStart',
    method: 'post',
    data,
  });
}

export function synchronousBtn(data) {
  return request({
    url: '/manager/MyGameResources/synchronousBtn',
    method: 'post',
    data,
  });
}

export function allSynchronous(data) {
  return request({
    url: '/manager/MyGameResources/allSynchronous',
    method: 'post',
    data,
  });
}

export function getStartList(data) {
  return request({
    url: '/manager/MyGameResources/getStartList',
    method: 'post',
    data,
  });
}

export function addSpell(data) {
  return request({
    url: '/manager/MyGameResources/addSpell',
    method: 'post',
    data,
  });
}
