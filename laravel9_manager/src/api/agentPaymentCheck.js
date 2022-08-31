import request from '@/utils/request';

export function getAgentPaymentApplyList(data) {
  return request({
    url: '/manager/AgentList/getAgentPaymentApplyList',
    method: 'post',
    data,
  });
}

export function agentPaymentCheck(data) {
  return request({
    url: '/manager/AgentList/agentPaymentCheck',
    method: 'post',
    data,
  });
}
