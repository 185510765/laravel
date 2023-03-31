/*!
 *  build: vue-admin-beautiful 
 *  vue-admin-beautiful author: chuzhixin 1204505056@qq.com 
 *  vue-admin-beautiful QQ Group(QQ群): 972435319、1139183756 
 *  time: 2022-8-24 15:12:47
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39554cb6"],{4259:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table-container"},[n("el-row",{attrs:{gutter:10}},[n("el-col",{attrs:{span:24}},[n("div",{staticStyle:{float:"left"}}),n("div",{staticStyle:{float:"right"}},[n("el-input",{staticClass:"searchText",attrs:{placeholder:"搜索关键字"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.index_handleQuery.apply(null,arguments)}},model:{value:e.index.queryForm.searchText,callback:function(t){e.$set(e.index.queryForm,"searchText",t)},expression:"index.queryForm.searchText"}}),n("el-button",{staticClass:"searchBtn",attrs:{icon:"el-icon-search",type:"primary","native-type":"submit"},on:{click:e.index_handleQuery}},[e._v(" 查询 ")])],1)])],1),n("el-row",{staticStyle:{"margin-top":"15px"}},[n("el-col",{attrs:{span:24}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.index.table.loading,expression:"index.table.loading"}],ref:"index.list",attrs:{data:e.index.table.list,"cell-style":e.rowClass,"header-cell-style":e.headClass,"row-style":e.tableRowStyle,"row-key":"id"},on:{"selection-change":e.index_handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"30","reserve-selection":!0}}),n("el-table-column",{attrs:{prop:"username",label:"用户名","min-width":"5%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"user_id",label:"用户id","min-width":"5%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"time",label:"时间","min-width":"8%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"ip",label:"ip","min-width":"5%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"province",label:"省","min-width":"5%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"city",label:"市","min-width":"5%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"status",label:"登录状态","min-width":"4%","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?n("span",{staticStyle:{color:"#f56c6c"}},[e._v(" 失败 ")]):1==t.row.status?n("span",{staticStyle:{color:"#67c23a"}},[e._v(" 成功 ")]):e._e()]}}])}),n("el-table-column",{attrs:{label:"操作","min-width":"5%"}})],1),n("el-pagination",{staticStyle:{"text-align":"right"},attrs:{"current-page":e.index.queryForm.currentPage,"page-sizes":[10,20,30,50,80,100],"page-size":e.index.queryForm.pageSize,layout:"total, prev, pager, next, sizes",total:e.index.table.total,background:""},on:{"current-change":e.index_currentChange,"size-change":e.index_sizeChange}})],1)],1)],1)},i=[],o=n("1da1"),a=(n("96cf"),n("7e55")),l=n("b39c"),c={data:function(){return{index:{queryForm:{searchText:"",currentPage:1,pageSize:10},table:{total:0,list:[],loading:!1},dialog:{title:0,visible:!1},form:{},formRules:{integration:[{required:!0,message:"请输入乐点",trigger:"blur"},{validator:l["checkNum"],trigger:"blur"}]},multipleSelection:[]},miner:{queryForm:{level:"",user_id:0,searchText:"",currentPage:1,pageSize:10},table:{total:0,list:[],loading:!1},dialog:{title:0,visible:!1},form:{},formRules:{integration:[{required:!0,message:"请输入乐点",trigger:"blur"},{validator:l["checkNum"],trigger:"blur"}]},multipleSelection:[]},levelList:[{label:"全部",value:""},{label:"白色",value:1},{label:"绿色",value:2},{label:"蓝色",value:3},{label:"紫色",value:4},{label:"橙色",value:5}]}},mounted:function(){this.getRecordList()},methods:{headClass:function(){return"background:#FAFAFA;"},rowClass:function(){},tableRowStyle:function(e){var t=e.row,n=(e.rowIndex,{});return 0==t.is_shelf?(n.color="rgba(2, 2, 2, 0.4)",n):""},getRecordList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.index.table.loading=!0,t.next=3,a["getRecordList"](e.index.queryForm);case 3:n=t.sent,r=n.data,e.index.table.loading=!1,r&&(e.index.table.list=r.list,e.index.table.total=r.total);case 7:case"end":return t.stop()}}),t)})))()},index_handleQuery:function(){this.index.queryForm.currentPage=1,this.getRecordList()},index_currentChange:function(e){this.index.queryForm.currentPage=e,this.getRecordList()},index_sizeChange:function(e){this.index.queryForm.pageSize=e,this.getRecordList()},index_handleSelectionChange:function(e){this.index.multipleSelection=e},userMinerListBtn:function(e){this.index.dialog.visible=!0,this.miner.queryForm.user_id=e.id,this.miner.queryForm.currentPage=1,this.getUserMinerList(e)},getUserMinerList:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.miner.table.loading=!0,e.next=3,a["getUserMinerList"](t.miner.queryForm);case 3:n=e.sent,r=n.data,t.miner.table.loading=!1,r&&(t.miner.table.list=r.list,t.miner.table.total=r.total);case 7:case"end":return e.stop()}}),e)})))()},miner_handleQuery:function(){this.miner.queryForm.currentPage=1,this.getUserMinerList()},miner_currentChange:function(e){this.miner.queryForm.currentPage=e,this.getUserMinerList()},miner_sizeChange:function(e){this.miner.queryForm.pageSize=e,this.getUserMinerList()},miner_handleSelectionChange:function(e){this.miner.multipleSelection=e}}},u=c,s=n("2877"),d=Object(s["a"])(u,r,i,!1,null,"e9a6e5e2",null);t["default"]=d.exports},"7e55":function(e,t,n){"use strict";n.r(t),n.d(t,"getRecordList",(function(){return i})),n.d(t,"getUserMinerList",(function(){return o})),n.d(t,"editIntegration",(function(){return a}));var r=n("b775");function i(e){return Object(r["default"])({url:"/manager/LoginRecord/getRecordList",method:"post",data:e})}function o(e){return Object(r["default"])({url:"/manager/LoginRecord/getUserMinerList",method:"post",data:e})}function a(e){return Object(r["default"])({url:"/manager/LoginRecord/editIntegration",method:"post",data:e})}},b39c:function(e,t,n){"use strict";n.r(t),n.d(t,"checkUserName",(function(){return i})),n.d(t,"checkPwd",(function(){return o})),n.d(t,"checkCodeLength",(function(){return a})),n.d(t,"checkSex",(function(){return l})),n.d(t,"checkPhoneCode",(function(){return c})),n.d(t,"checkPhone",(function(){return u})),n.d(t,"checkName",(function(){return s})),n.d(t,"checkEmail",(function(){return d})),n.d(t,"checkMoney",(function(){return h})),n.d(t,"checkNumber",(function(){return m})),n.d(t,"checkNum",(function(){return f})),n.d(t,"checkDiscount",(function(){return g})),n.d(t,"checkEmptyObj",(function(){return b})),n.d(t,"checkHasTrueObj",(function(){return p})),n.d(t,"checkKD",(function(){return w})),n.d(t,"checkProbability",(function(){return y})),n.d(t,"checkJson",(function(){return x}));var r=n("61f7");function i(e,t,n){r["isUserName"](t)?n():n(new Error("用户名只支持5-50位数字字母下划线"))}function o(e,t,n){r["isPassword"](t)?n():n(new Error("密码长度需大于6位"))}function a(e,t,n){r["isCode"](t)?n():n(new Error("请输入4位数的验证码"))}function l(e,t,n){r["isNumber"](t)?n():n(new Error("性别只能是数字"))}function c(e,t,n){r["isPhoneCode"](t)?n():n(new Error("请输入6位数的手机验证码"))}function u(e,t,n){r["isPhone"](t)?n():n(new Error("请输入正确的手机号"))}function s(e,t,n){r["isChina"](t)?n():n(new Error("请输入正确的中文名"))}function d(e,t,n){r["isEmail"](t)?n():n(new Error("请输入正确的邮箱"))}function h(e,t,n){r["isMoney"](t)?n():n(new Error("请输入正确的金额"))}function m(e,t,n){r["isNumber"](t)?n():n(new Error("请输入正确的数字"))}function f(e,t,n){r["isNum"](t)?n():n(new Error("请输入正整数"))}function g(e,t,n){r["isDiscount"](t)?n():n(new Error("请输入有效的折扣"))}function b(e,t,n){r["isEmptyObj"](t)?n():n(new Error("至少选择一种"))}function p(e,t,n){r["isHasTrueObj"](t)?n():n(new Error("至少选择一种"))}function w(e,t,n){r["isMoney"](t)?n():n(new Error("请输入有效的KD"))}function y(e,t,n){r["isIntRangeOneThousand"](t)?n():n(new Error("中奖概率请填写1~1000整数"))}function x(e,t,n){r["isJSON"](t)?n():n(new Error("数据无效"))}}}]);