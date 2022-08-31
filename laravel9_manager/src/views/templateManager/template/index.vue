<template>
  <div class="table-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div style="float: left">
          <!-- <el-button type="primary" @click="showAddVoiceDialog()">
            新增
          </el-button> -->
        </div>
        <div style="float: right">
          <span>插件启用类型：</span>
          <el-select
            v-model="index.queryForm.plug_config_type"
            style="margin-right: 10px"
          >
            <el-option
              v-for="item in plugConfigTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="index.queryForm.searchText"
            class="searchText"
            placeholder="搜索关键字"
            @keyup.native.enter="index_handleQuery"
          />
          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            class="searchBtn"
            @click="index_handleQuery"
          >
            查询
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px">
      <el-col :span="24">
        <el-table
          ref="index.list"
          v-loading="index.listLoading"
          :data="index.list"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :row-style="tableRowStyle"
          row-key="id"
          @selection-change="index_handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            :reserve-selection="true"
          ></el-table-column>
          <!-- <el-table-column
            prop="pop"
            label="排序"
            min-width="3%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.pop"
                onkeyup="value=value.replace(/^0(0+)|[^\d]+/g,'')"
                @change="musicSort(scope.row.id, scope.row.pop)"
              ></el-input>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="id"
            label="网吧ID"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="网吧名称"
            min-width="10%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="member_id"
            label="用户ID"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            min-width="10%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="strAgentAccount"
            label="所属代理商"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.agent_id === 10000" style="color: red">
                默认系统代理商
              </span>
              <span v-else>{{ scope.row.strAgentAccount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="terminal_count"
            label="在线终端/总终端数"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.bar_now_count }} / {{ scope.row.bar_max_count }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_vip"
            label="版本类型"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="end_time"
            label="VIP到期时间"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="bar_status" label="在线状态" min-width="6%">
            <template slot-scope="scope">
              <span v-if="scope.row.bar_status != 1" style="color: #f00">
                离线
              </span>
              <span
                v-if="scope.row.bar_status == 1"
                style="color: rgb(25 166 25)"
              >
                在线
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_vip"
            label="插件启用类型"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.plug_config_type"
                @change="
                  plugConfigTypeChange(scope.row.id, scope.row.plug_config_type)
                "
              >
                <el-option
                  v-for="item in table_plugConfigTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="操作" min-width="8%">
            <template slot-scope="scope">
              <img
                :src="scope.row.audio_img"
                class="audition"
                @click="getMusicUrl(scope.row, scope.$index)"
              />

              <!-- <el-button type="text" @click="showEditMusicDialog(scope.row)">
                编辑
              </el-button> -->
              <!-- <el-button
                type="text"
                style="color: #f56c6c"
                @click="delMusic(scope.row.id)"
              >
                删除
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-pagination
          style="text-align: right"
          :current-page="index.queryForm.currentPage"
          :page-sizes="[10, 20, 30, 50, 80, 100]"
          :page-size="index.queryForm.pageSize"
          layout="total, prev, pager, next, sizes"
          :total="index.total"
          background
          @current-change="index_currentChange"
          @size-change="index_sizeChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as barList from '@/api/barList.js';
  import { isEmpty } from '@/utils/common.js';
  // import * as rule from '@/utils/rule.js';

  export default {
    data() {
      return {
        index: {
          queryForm: {
            plug_config_type: '',
            searchText: '',
            currentPage: 1,
            pageSize: 10,
          },

          total: 0,
          list: [],
          listLoading: false,

          dialog: {
            title: 0,
            visible: false,
          },

          form: {
            name: '',
            img: '',
            price: 0,
            is_limit: 0,
            stock: 0,
          },
          formRules: {
            name: [
              { required: true, message: '请输入商品名称', trigger: 'blur' },
            ],
            price: [
              { required: true, message: '请输入标价', trigger: 'blur' },
              // { validator: rule.checkNum, trigger: 'blur' },
            ],
          },

          multipleSelection: [],
        },

        plugConfigTypeList: [
          { label: '全部', value: '' },
          { label: '按区域', value: 0 },
          { label: '按网吧', value: 1 },
          { label: '按用户', value: 2 },
        ],

        table_plugConfigTypeList: [
          { label: '按区域', value: 0 },
          { label: '按网吧', value: 1 },
          { label: '按用户', value: 2 },
        ],
      };
    },
    mounted() {
      this.getBarList();
    },
    methods: {
      // 表头样式设置
      headClass() {
        return 'background:#FAFAFA;';
      },

      // 表格样式设置
      rowClass() {},

      // table 一行样式
      tableRowStyle({ row, rowIndex }) {
        const styleObj = {};
        if (row.is_shelf == 0) {
          styleObj.color = 'rgba(2, 2, 2, 0.4)';
          return styleObj;
        }
        return '';
      },

      // 获取网吧列表
      async getBarList() {
        this.index.listLoading = true;
        const { data } = await barList.getBarList(this.index.queryForm);
        this.index.listLoading = false;
        if (data) {
          this.index.list = data.list;
          this.index.total = data.total;
        }
      },

      // 搜索
      index_handleQuery() {
        this.index.queryForm.currentPage = 1;
        this.getBarList();
      },

      // 页码切换
      index_currentChange(val) {
        this.index.queryForm.currentPage = val;
        this.getBarList();
      },

      // 每页数量改变
      index_sizeChange(val) {
        this.index.queryForm.pageSize = val;
        this.getBarList();
      },

      // 表格checkbox选中
      index_handleSelectionChange(val) {
        this.index.multipleSelection = val;
      },

      // table表格 插件启用类型切换
      async plugConfigTypeChange(id, plug_config_type) {
        const params = {
          id: id,
          plug_config_type: plug_config_type,
        };
        const { data } = await barList.plugConfigTypeChange(params);
        if (data) {
          this.$baseMessage('插件启用类型切换成功!', 'success');
          this.getBarList();
        }
      },

      // // 排序
      // async sort(id, sort) {
      //   const params = {
      //     id: id,
      //     sort: sort,
      //   };
      //   const { data } = await goodsList.sort(params);
      //   if (data) {
      //     this.$baseMessage('排序成功！', 'success');
      //     this.getGoodsList();
      //   }
      // },
    },
  };
</script>
