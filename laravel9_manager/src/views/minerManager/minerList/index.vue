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
          <span>矿工颜色：</span>
          <el-select v-model="index.queryForm.level" style="margin-right: 10px">
            <el-option
              v-for="item in levelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>矿工状态：</span>
          <el-select
            v-model="index.queryForm.status"
            style="margin-right: 10px"
          >
            <el-option
              v-for="item in statusList"
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
          <el-table-column
            prop="id"
            label="矿工id"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="user_id"
            label="玩家id"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="nick_name"
            label="玩家昵称"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="招募时间"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="power"
            label="力量"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="speed"
            label="速度"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="stealth"
            label="潜行"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="lucky"
            label="幸运值"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="scope_sum"
            label="总分"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="color"
            label="颜色等级"
            min-width="7%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.level == 1" style="color: #909399">
                白色
              </span>
              <span v-else-if="scope.row.level == 2" style="color: #67c23a">
                绿色
              </span>
              <span v-else-if="scope.row.level == 3" style="color: #409eff">
                蓝色
              </span>
              <span v-else-if="scope.row.level == 4" style="color: #8a2be2">
                紫色
              </span>
              <span v-else-if="scope.row.level == 5" style="color: #e6a23c">
                橙色
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="4%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color: #909399">
                空闲
              </span>
              <span v-else-if="scope.row.status == 1" style="color: #409eff">
                挖矿中
              </span>
              <span v-else-if="scope.row.status == 2" style="color: #f56c6c">
                被抓
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="5%">
            <template slot-scope="scope">
              <el-button type="text" @click="showMinerInfoDialogBtn(scope.row)">
                修改等级
              </el-button>
            </template>
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

    <!-- *************************************************** dialog ********************************************************************** -->

    <!-- 修改矿工等级 -->
    <el-dialog
      title="修改矿工等级"
      :visible.sync="miner.dialog.visible"
      width="500px"
      @closed="$reset('index.form')"
    >
      <el-form :model="miner.form" label-width="100px">
        <el-form-item label="颜色等级：">
          <el-select v-model="miner.form.level">
            <el-option
              v-for="item in levelDialogList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="miner.dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="changeLevel()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/static/manager/js/minerList.js"></script>
<style scoped></style>
