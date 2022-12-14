/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layouts';
import EmptyLayout from '@/layouts/EmptyLayout';
import { publicPath, routerMode } from '@/config';

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },

  // 矿工管理
  {
    path: '/minerManager',
    component: Layout,
    redirect: 'noRedirect',
    name: 'minerManager',
    meta: { title: '矿工管理', icon: 'user' },
    children: [
      {
        path: '/minerList',
        name: 'minerList',
        component: () => import('@/views/minerManager/minerList/index'),
        meta: { title: '矿工列表', icon: 'atlas' },
      },
      // {
      //   path: '/inviteCode',
      //   name: 'inviteCode',
      //   component: () => import('@/views/minerManager/inviteCode/index'),
      //   meta: { title: '邀请码管理' },
      // },
    ],
  },

  // 用户管理
  {
    path: '/userManager',
    component: Layout,
    redirect: 'noRedirect',
    name: 'userManager',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: '/userList',
        name: 'userList',
        component: () => import('@/views/userManager/userList/index'),
        meta: { title: '用户列表', icon: 'user' },
      },
      // {
      //   path: '/inviteCode',
      //   name: 'inviteCode',
      //   component: () => import('@/views/userManager/inviteCode/index'),
      //   meta: { title: '邀请码管理' },
      // },
    ],
  },

  // 花样币管理
  {
    path: '/huayangbiManager',
    component: Layout,
    redirect: 'noRedirect',
    name: 'huayangbiManager',
    meta: { title: '花样币管理', icon: 'money-bill-wave-alt' },
    children: [
      {
        path: '/huayangbiRecord',
        name: 'huayangbiRecord',
        component: () =>
          import('@/views/huayangbiManager/huayangbiRecord/index'),
        meta: { title: '花样币挖取记录', icon: 'money-bill-wave-alt' },
      },
      // {
      //   path: '/inviteCode',
      //   name: 'inviteCode',
      //   component: () => import('@/views/huayangbiManager/inviteCode/index'),
      //   meta: { title: '邀请码管理' },
      // },
    ],
  },

  // 系统管理
  {
    path: '/sysManager',
    component: Layout,
    redirect: 'noRedirect',
    name: 'sysManager',
    meta: { title: '系统管理', icon: 'tools' },
    children: [
      // {
      //   path: '/operationLog',
      //   name: 'operationLog',
      //   component: () => import('@/views/sysManager/operationLog/index'),
      //   meta: { title: '操作日志' },
      // },
      {
        path: '/loginRecord',
        name: 'loginRecord',
        component: () => import('@/views/sysManager/loginRecord/index'),
        meta: { title: '登录日志' },
      },
      {
        path: '/sysUser',
        name: 'sysUser',
        component: () => import('@/views/sysManager/sysUser/index'),
        meta: { title: '系统用户' },
      },
      {
        path: '/sysConfig',
        name: 'sysConfig',
        component: () => import('@/views/sysManager/sysConfig/index'),
        meta: { title: '系统设置' },
      },
    ],
  },

  // // 模板页面  // websocket
  // {
  //   path: '/templateManager',
  //   name: 'templateManager',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: { title: '模板管理', icon: 'tools' },
  //   children: [
  //     {
  //       path: '/websocket',
  //       name: 'websocket',
  //       component: () => import('@/views/templateManager/websocket/index'),
  //       meta: { title: 'websocket测试' },
  //     },
  //   ],
  // },

  // // 模板页面
  // {
  //   path: '/templateManager',
  //   name: 'templateManager',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: { title: '模板管理', icon: 'tools' },
  //   children: [
  //     {
  //       path: '/template',
  //       name: 'template',
  //       component: () => import('@/views/templateManager/template/index'),
  //       meta: { title: '模板页面' },
  //     },
  //   ],
  // },

  // ****************************************************************************************

  // {
  //   path: '/mall',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'Mall',
  //   meta: {
  //     title: '商城',
  //     icon: 'shopping-cart',
  //   },

  //   children: [
  //     {
  //       path: 'pay',
  //       name: 'Pay',
  //       component: () => import('@/views/mall/pay/index'),
  //       meta: {
  //         title: '支付',
  //         noKeepAlive: true,
  //       },
  //       children: null,
  //     },
  //     {
  //       path: 'goodsList',
  //       name: 'GoodsList',
  //       component: () => import('@/views/mall/goodsList/index'),
  //       meta: {
  //         title: '商品列表',
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: '/vab',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'Vab',
  //   alwaysShow: true,
  //   meta: { title: '组件', icon: 'box-open' },
  //   children: [
  //     {
  //       path: 'permissions',
  //       name: 'Permission',
  //       component: () => import('@/views/vab/permissions/index'),
  //       meta: {
  //         title: '角色权限',
  //         permissions: ['admin', 'editor'],
  //       },
  //     },
  //     {
  //       path: 'icon',
  //       component: EmptyLayout,
  //       redirect: 'noRedirect',
  //       name: 'Icon',
  //       meta: {
  //         title: '图标',
  //         permissions: ['admin'],
  //       },
  //       children: [
  //         {
  //           path: 'awesomeIcon',
  //           name: 'AwesomeIcon',
  //           component: () => import('@/views/vab/icon/index'),
  //           meta: { title: '常规图标' },
  //         },
  //         {
  //           path: 'colorfulIcon',
  //           name: 'ColorfulIcon',
  //           component: () => import('@/views/vab/icon/colorfulIcon'),
  //           meta: { title: '多彩图标' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'table',
  //       component: () => import('@/views/vab/table/index'),
  //       name: 'Table',
  //       meta: {
  //         title: '表格',
  //         permissions: ['admin'],
  //       },
  //     },
  //     {
  //       path: 'map',
  //       component: () => import('@/views/vab/map/index'),
  //       name: 'Map',
  //       meta: {
  //         title: '地图',
  //         permissions: ['admin'],
  //       },
  //     },

  //     {
  //       path: 'webSocket',
  //       name: 'WebSocket',
  //       component: () => import('@/views/vab/webSocket/index'),
  //       meta: { title: 'webSocket', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'form',
  //       name: 'Form',
  //       component: () => import('@/views/vab/form/index'),
  //       meta: { title: '表单', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'element',
  //       name: 'Element',
  //       component: () => import('@/views/vab/element/index'),
  //       meta: { title: '常用组件', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/vab/tree/index'),
  //       meta: { title: '树', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'verify',
  //       name: 'Verify',
  //       component: () => import('@/views/vab/verify/index'),
  //       meta: { title: '验证码', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/vab/nested/menu1/index'),
  //       name: 'Menu1',
  //       alwaysShow: true,
  //       meta: {
  //         title: '嵌套路由 1',
  //         permissions: ['admin'],
  //       },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           name: 'Menu1-1',
  //           alwaysShow: true,
  //           meta: { title: '嵌套路由 1-1' },
  //           component: () => import('@/views/vab/nested/menu1/menu1-1/index'),

  //           children: [
  //             {
  //               path: 'menu1-1-1',
  //               name: 'Menu1-1-1',
  //               meta: { title: '嵌套路由 1-1-1' },
  //               component: () =>
  //                 import('@/views/vab/nested/menu1/menu1-1/menu1-1-1/index'),
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: 'magnifier',
  //       name: 'Magnifier',
  //       component: () => import('@/views/vab/magnifier/index'),
  //       meta: { title: '放大镜', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'loading',
  //       name: 'Loading',
  //       component: () => import('@/views/vab/loading/index'),
  //       meta: { title: 'loading', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'player',
  //       name: 'Player',
  //       component: () => import('@/views/vab/player/index'),
  //       meta: { title: '视频播放器', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'markdownEditor',
  //       name: 'MarkdownEditor',
  //       component: () => import('@/views/vab/markdownEditor/index'),
  //       meta: { title: 'markdown编辑器', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'editor',
  //       name: 'Editor',
  //       component: () => import('@/views/vab/editor/index'),
  //       meta: {
  //         title: '富文本编辑器',
  //         permissions: ['admin'],
  //         badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'backToTop',
  //       name: 'BackToTop',
  //       component: () => import('@/views/vab/backToTop/index'),
  //       meta: { title: '返回顶部', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'lodash',
  //       name: 'Lodash',
  //       component: () => import('@/views/vab/lodash/index'),
  //       meta: { title: 'lodash', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'smallComponents',
  //       name: 'SmallComponents',
  //       component: () => import('@/views/vab/smallComponents/index'),
  //       meta: { title: '小组件', permissions: ['admin'] },
  //     },

  //     {
  //       path: 'upload',
  //       name: 'Upload',
  //       component: () => import('@/views/vab/upload/index'),
  //       meta: { title: '上传', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'log',
  //       name: 'Log',
  //       component: () => import('@/views/vab/errorLog/index'),
  //       meta: { title: '错误日志模拟', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'https://github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
  //       name: 'ExternalLink',
  //       meta: {
  //         title: '外链',
  //         target: '_blank',
  //         permissions: ['admin', 'editor'],
  //         badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'more',
  //       name: 'More',
  //       component: () => import('@/views/vab/more/index'),
  //       meta: { title: '关于', permissions: ['admin'] },
  //     },
  //   ],
  // },

  // {
  //   path: '/personnelManagement',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'PersonnelManagement',
  //   meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
  //   children: [
  //     {
  //       path: 'userManagement',
  //       name: 'UserManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/userManagement/index'),
  //       meta: { title: '用户管理' },
  //     },
  //     {
  //       path: 'roleManagement',
  //       name: 'RoleManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/roleManagement/index'),
  //       meta: { title: '角色管理' },
  //     },
  //     {
  //       path: 'menuManagement',
  //       name: 'MenuManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/menuManagement/index'),
  //       meta: { title: '菜单管理', badge: 'New' },
  //     },
  //   ],
  // },

  // {
  //   path: '/error',
  //   component: EmptyLayout,
  //   redirect: 'noRedirect',
  //   name: 'Error',
  //   meta: { title: '错误页', icon: 'bug' },
  //   children: [
  //     {
  //       path: '401',
  //       name: 'Error401',
  //       component: () => import('@/views/401'),
  //       meta: { title: '401' },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: { title: '404' },
  //     },
  //   ],
  // },

  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});

export function resetRouter() {
  location.reload();
}

export default router;
