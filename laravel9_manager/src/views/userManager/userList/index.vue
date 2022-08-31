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
          <el-table-column
            prop="id"
            label="用户id"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="nick_name"
            label="昵称"
            min-width="5%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="union_id"
            label="union_id"
            min-width="12%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="注册时间"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="warehouse_iron"
            label="仓库铁矿"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="warehouse_copper"
            label="仓库铜矿"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="warehouse_tin"
            label="仓库锡矿"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="warehouse_silver"
            label="仓库银矿"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="warehouse_gold"
            label="仓库金矿"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="last_login_time"
            label="上次登录游戏时间"
            min-width="7%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="last_exit_time"
            label="上次退出游戏时间"
            min-width="7%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="is_online"
            label="是否在线"
            min-width="4%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.is_online == 0" style="color: #f56c6c">
                不在线
              </span>
              <span v-else-if="scope.row.is_online == 1" style="color: #67c23a">
                在线
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="5%">
            <template slot-scope="scope">
              <el-button type="text" @click="userMinerListBtn(scope.row)">
                矿工列表({{ scope.row.miner_count }})
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

    <!-- 用户矿工列表 -->
    <el-dialog
      title="用户矿工"
      :visible.sync="index.dialog.visible"
      width="1200px"
      @closed="$reset('index.form')"
    >
      <div>
        <el-row :gutter="10">
          <el-col :span="24" style="text-align: right; margin-bottom: 10px">
            <span>矿工颜色：</span>
            <el-select
              v-model="miner.queryForm.level"
              style="margin-right: 10px"
            >
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>矿工状态：</span>
            <el-select
              v-model="miner.queryForm.status"
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
              v-model="miner.queryForm.searchText"
              class="searchText"
              placeholder="请输入查询关键字"
              @keyup.native.enter="miner_handleQuery()"
            />
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              class="searchBtn"
              @click="miner_handleQuery()"
            >
              查询
            </el-button>
          </el-col>
        </el-row>

        <el-table
          ref="miner.list"
          v-loading="miner.table.loading"
          :data="miner.table.list"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :row-style="tableRowStyle"
          row-key="id"
          @selection-change="miner_handleSelectionChange"
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
          style="text-align: right; margin-top: 10px"
          :current-page="miner.queryForm.currentPage"
          :page-sizes="[10, 20, 30, 50, 80, 100]"
          :page-size="miner.queryForm.pageSize"
          layout="total, prev, pager, next, sizes"
          :total="miner.table.total"
          background
          @current-change="miner_currentChange"
          @size-change="miner_sizeChange"
        ></el-pagination>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="index.dialog.visible = false">
          关 闭
        </el-button>
      </div>
    </el-dialog>

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

<script src="@/static/manager/js/userList.js"></script>
<style scoped src="@/static/manager/css/userList.css"></style>
