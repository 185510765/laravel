/*!
 *  build: vue-admin-beautiful 
 *  vue-admin-beautiful author: chuzhixin 1204505056@qq.com 
 *  vue-admin-beautiful QQ Group(QQ群): 972435319、1139183756 
 *  time: 2022-8-24 15:12:47
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1285052b"],{"3b7e":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table-container"},[n("el-row",{attrs:{gutter:10}},[n("el-col",{attrs:{span:24}},[n("div",{staticStyle:{float:"left"}}),n("div",{staticStyle:{float:"right"}},[n("span",[e._v("矿工颜色：")]),n("el-select",{staticStyle:{"margin-right":"10px"},model:{value:e.index.queryForm.level,callback:function(t){e.$set(e.index.queryForm,"level",t)},expression:"index.queryForm.level"}},e._l(e.levelList,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),n("span",[e._v("矿工状态：")]),n("el-select",{staticStyle:{"margin-right":"10px"},model:{value:e.index.queryForm.status,callback:function(t){e.$set(e.index.queryForm,"status",t)},expression:"index.queryForm.status"}},e._l(e.statusList,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),n("el-input",{staticClass:"searchText",attrs:{placeholder:"搜索关键字"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.index_handleQuery.apply(null,arguments)}},model:{value:e.index.queryForm.searchText,callback:function(t){e.$set(e.index.queryForm,"searchText",t)},expression:"index.queryForm.searchText"}}),n("el-button",{staticClass:"searchBtn",attrs:{icon:"el-icon-search",type:"primary","native-type":"submit"},on:{click:e.index_handleQuery}},[e._v(" 查询 ")])],1)])],1),n("el-row",{staticStyle:{"margin-top":"15px"}},[n("el-col",{attrs:{span:24}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.index.table.loading,expression:"index.table.loading"}],ref:"index.list",attrs:{data:e.index.table.list,"cell-style":e.rowClass,"header-cell-style":e.headClass,"row-style":e.tableRowStyle,"row-key":"id"},on:{"selection-change":e.index_handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"30","reserve-selection":!0}}),n("el-table-column",{attrs:{prop:"id",label:"矿工id","min-width":"5%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"name",label:"名称","min-width":"8%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"user_id",label:"玩家id","min-width":"5%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"nick_name",label:"玩家昵称","min-width":"8%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"create_time",label:"招募时间","min-width":"8%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"power",label:"力量","min-width":"4%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"speed",label:"速度","min-width":"4%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"stealth",label:"潜行","min-width":"4%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"lucky",label:"幸运值","min-width":"4%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"scope_sum",label:"总分","min-width":"4%","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{prop:"color",label:"颜色等级","min-width":"7%","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.level?n("span",{staticStyle:{color:"#909399"}},[e._v(" 白色 ")]):2==t.row.level?n("span",{staticStyle:{color:"#67c23a"}},[e._v(" 绿色 ")]):3==t.row.level?n("span",{staticStyle:{color:"#409eff"}},[e._v(" 蓝色 ")]):4==t.row.level?n("span",{staticStyle:{color:"#8a2be2"}},[e._v(" 紫色 ")]):5==t.row.level?n("span",{staticStyle:{color:"#e6a23c"}},[e._v(" 橙色 ")]):e._e()]}}])}),n("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"4%","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?n("span",{staticStyle:{color:"#909399"}},[e._v(" 空闲 ")]):1==t.row.status?n("span",{staticStyle:{color:"#409eff"}},[e._v(" 挖矿中 ")]):2==t.row.status?n("span",{staticStyle:{color:"#f56c6c"}},[e._v(" 被抓 ")]):e._e()]}}])}),n("el-table-column",{attrs:{label:"操作","min-width":"5%"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return e.showMinerInfoDialogBtn(t.row)}}},[e._v(" 修改等级 ")])]}}])})],1),n("el-pagination",{staticStyle:{"text-align":"right"},attrs:{"current-page":e.index.queryForm.currentPage,"page-sizes":[10,20,30,50,80,100],"page-size":e.index.queryForm.pageSize,layout:"total, prev, pager, next, sizes",total:e.index.table.total,background:""},on:{"current-change":e.index_currentChange,"size-change":e.index_sizeChange}})],1)],1),n("el-dialog",{attrs:{title:"修改矿工等级",visible:e.miner.dialog.visible,width:"500px"},on:{"update:visible":function(t){return e.$set(e.miner.dialog,"visible",t)},closed:function(t){return e.$reset("index.form")}}},[n("el-form",{attrs:{model:e.miner.form,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"颜色等级："}},[n("el-select",{model:{value:e.miner.form.level,callback:function(t){e.$set(e.miner.form,"level",t)},expression:"miner.form.level"}},e._l(e.levelDialogList,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.miner.dialog.visible=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.changeLevel()}}},[e._v("确定")])],1)],1)],1)},l=[],i=n("1da1"),o=(n("96cf"),n("ab35")),a=(n("cf45"),n("b39c")),s={data:function(){return{index:{queryForm:{level:"",status:"",searchText:"",currentPage:1,pageSize:10},table:{total:0,list:[],loading:!1},dialog:{title:0,visible:!1},form:{},formRules:{integration:[{required:!0,message:"请输入乐点",trigger:"blur"},{validator:a["checkNum"],trigger:"blur"}]},multipleSelection:[]},miner:{queryForm:{user_id:0,searchText:"",currentPage:1,pageSize:10},table:{total:0,list:[],loading:!1},dialog:{title:0,visible:!1},form:{id:0,level:1},formRules:{integration:[{required:!0,message:"请输入乐点",trigger:"blur"},{validator:a["checkNum"],trigger:"blur"}]},multipleSelection:[]},levelList:[{label:"全部",value:""},{label:"白色",value:1},{label:"绿色",value:2},{label:"蓝色",value:3},{label:"紫色",value:4},{label:"橙色",value:5}],levelDialogList:[{label:"白色",value:1},{label:"绿色",value:2},{label:"蓝色",value:3},{label:"紫色",value:4},{label:"橙色",value:5}],statusList:[{label:"全部",value:""},{label:"空闲",value:0},{label:"挖矿中",value:1},{label:"被抓",value:2}]}},mounted:function(){this.getMinerList()},methods:{headClass:function(){return"background:#FAFAFA;"},rowClass:function(){},tableRowStyle:function(e){var t=e.row,n=(e.rowIndex,{});return 0==t.is_shelf?(n.color="rgba(2, 2, 2, 0.4)",n):""},getMinerList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.index.table.loading=!0,t.next=3,o["getMinerList"](e.index.queryForm);case 3:n=t.sent,r=n.data,e.index.table.loading=!1,r&&(e.index.table.list=r.list,e.index.table.total=r.total);case 7:case"end":return t.stop()}}),t)})))()},index_handleQuery:function(){this.index.queryForm.currentPage=1,this.getMinerList()},index_currentChange:function(e){this.index.queryForm.currentPage=e,this.getMinerList()},index_sizeChange:function(e){this.index.queryForm.pageSize=e,this.getMinerList()},index_handleSelectionChange:function(e){this.index.multipleSelection=e},showMinerInfoDialogBtn:function(e){this.miner.form={id:e.id,level:e.level},this.miner.dialog={visible:!0,title:0}},changeLevel:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["changeLevel"](e.miner.form);case 2:n=t.sent,r=n.data,r&&(e.miner.dialog.visible=!1,e.$baseMessage("修改成功","success"),e.getMinerList());case 5:case"end":return t.stop()}}),t)})))()}}},u=s,c=n("2877"),d=Object(c["a"])(u,r,l,!1,null,"318b8a31",null);t["default"]=d.exports},ab35:function(e,t,n){"use strict";n.r(t),n.d(t,"getMinerList",(function(){return l})),n.d(t,"changeLevel",(function(){return i}));var r=n("b775");function l(e){return Object(r["default"])({url:"/manager/UserMiner/getMinerList",method:"post",data:e})}function i(e){return Object(r["default"])({url:"/manager/UserMiner/changeLevel",method:"post",data:e})}},b39c:function(e,t,n){"use strict";n.r(t),n.d(t,"checkUserName",(function(){return l})),n.d(t,"checkPwd",(function(){return i})),n.d(t,"checkCodeLength",(function(){return o})),n.d(t,"checkSex",(function(){return a})),n.d(t,"checkPhoneCode",(function(){return s})),n.d(t,"checkPhone",(function(){return u})),n.d(t,"checkName",(function(){return c})),n.d(t,"checkEmail",(function(){return d})),n.d(t,"checkMoney",(function(){return f})),n.d(t,"checkNumber",(function(){return m})),n.d(t,"checkNum",(function(){return b})),n.d(t,"checkDiscount",(function(){return h})),n.d(t,"checkEmptyObj",(function(){return p})),n.d(t,"checkHasTrueObj",(function(){return v})),n.d(t,"checkKD",(function(){return w})),n.d(t,"checkProbability",(function(){return g})),n.d(t,"checkJson",(function(){return y}));var r=n("61f7");function l(e,t,n){r["isUserName"](t)?n():n(new Error("用户名只支持5-50位数字字母下划线"))}function i(e,t,n){r["isPassword"](t)?n():n(new Error("密码长度需大于6位"))}function o(e,t,n){r["isCode"](t)?n():n(new Error("请输入4位数的验证码"))}function a(e,t,n){r["isNumber"](t)?n():n(new Error("性别只能是数字"))}function s(e,t,n){r["isPhoneCode"](t)?n():n(new Error("请输入6位数的手机验证码"))}function u(e,t,n){r["isPhone"](t)?n():n(new Error("请输入正确的手机号"))}function c(e,t,n){r["isChina"](t)?n():n(new Error("请输入正确的中文名"))}function d(e,t,n){r["isEmail"](t)?n():n(new Error("请输入正确的邮箱"))}function f(e,t,n){r["isMoney"](t)?n():n(new Error("请输入正确的金额"))}function m(e,t,n){r["isNumber"](t)?n():n(new Error("请输入正确的数字"))}function b(e,t,n){r["isNum"](t)?n():n(new Error("请输入正整数"))}function h(e,t,n){r["isDiscount"](t)?n():n(new Error("请输入有效的折扣"))}function p(e,t,n){r["isEmptyObj"](t)?n():n(new Error("至少选择一种"))}function v(e,t,n){r["isHasTrueObj"](t)?n():n(new Error("至少选择一种"))}function w(e,t,n){r["isMoney"](t)?n():n(new Error("请输入有效的KD"))}function g(e,t,n){r["isIntRangeOneThousand"](t)?n():n(new Error("中奖概率请填写1~1000整数"))}function y(e,t,n){r["isJSON"](t)?n():n(new Error("数据无效"))}}}]);