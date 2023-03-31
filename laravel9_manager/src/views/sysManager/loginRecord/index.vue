<template>
  <div class="table-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div style="float: left">
          <!-- <el-button type="primary" @click="showRestartPlugDialog()">
            重启插件服务
          </el-button> -->
        </div>
        <div style="float: right">
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
          v-loading="index.table.loading"
          :data="index.table.list"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :row-style="tableRowStyle"
          row-key="id"
          @selection-change="index_handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="30"
            :reserve-selection="true"
          ></el-table-column>
          <!-- <el-table-column
            prop="id"
            label="id"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column> -->
          <el-table-column
            prop="username"
            label="用户名"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="user_id"
            label="用户id"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="ip"
            label="ip"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="省"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="city"
            label="市"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <el-table-column
            prop="status"
            label="登录状态"
            min-width="4%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color: #f56c6c">
                失败
              </span>
              <span v-else-if="scope.row.status == 1" style="color: #67c23a">
                成功
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="5%">
            <!-- <template slot-scope="scope">
              <el-button type="text" @click="userMinerListBtn(scope.row)">
                矿工列表({{ scope.row.miner_count }})
              </el-button>
            </template> -->
          </el-table-column>
        </el-table>

        <el-pagination
          style="text-align: right"
          :current-page="index.queryForm.currentPage"
          :page-sizes="[10, 20, 30, 50, 80, 100]"
          :page-size="index.queryForm.pageSize"
          layout="total, prev, pager, next, sizes"
          :total="index.table.total"
          background
          @current-change="index_currentChange"
          @size-change="index_sizeChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script src="@/static/manager/js/loginRecord.js"></script>

<style scoped></style>
