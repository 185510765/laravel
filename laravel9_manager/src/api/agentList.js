import request from '@/utils/request';

export function getAgentList(data) {
  return request({
    url: '/manager/AgentList/getAgentList',
    method: 'post',
    data,
  });
}

export function editIntegration(data) {
  return request({
    url: '/manager/AgentList/editIntegration',
    method: 'post',
    data,
  });
}

export function statusSelect(data) {
  return request({
    url: '/manager/AgentList/statusSelect',
    method: 'post',
    data,
  });
}
