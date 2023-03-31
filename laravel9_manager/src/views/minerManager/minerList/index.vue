<template>
  <div class="table-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div style="float: left">
          <!-- <el-button type="primary" @click="showTestGoldDialog()">
            模拟挖矿
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

    <el-row style="margin-top: 10px">
      <el-col
        :span="24"
        style="
          height: 34px;
          line-height: 34px;
          text-align: right;
          font-size: 16px;
          font-weight: bold;
        "
      >
        <span>矿工总数：{{ minerCount[0] }}</span>
        <span style="margin-left: 40px; color: #909399">
          白色矿工：{{ minerCount[1] }}
        </span>
        <span style="margin-left: 40px; color: #67c23a">
          绿色矿工：{{ minerCount[2] }}
        </span>
        <span style="margin-left: 40px; color: #409eff">
          蓝色矿工：{{ minerCount[3] }}
        </span>
        <span style="margin-left: 40px; color: #a020f0">
          紫色矿工：{{ minerCount[4] }}
        </span>
        <span style="margin-left: 40px; color: #e6a23c">
          橙色矿工：{{ minerCount[5] }}
        </span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px">
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
            prop="user.nick_name"
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
              <el-button
                v-if="btnIsShow"
                type="text"
                @click="showMinerInfoDialogBtn(scope.row)"
              >
                修改等级
              </el-button>
              <el-button type="text" @click="delMiner(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style="text-align: right"
          :current-page="index.queryForm.page"
          :page-sizes="[10, 20, 30, 50, 80, 100]"
          :page-size="index.queryForm.size"
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
      @closed="$reset('miner.form')"
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

    <!-- 模拟挖矿 -->
    <el-dialog
      title="模拟挖矿"
      :visible.sync="test.dialog.visible"
      width="600px"
      @closed="$reset('test.form')"
    >
      <el-form :model="test.form">
        <el-form-item>
          <el-row :gutter="10">
            <el-col :span="8" style="text-align: center">矿工个数</el-col>
            <el-col :span="8" style="text-align: center">矿工颜色等级</el-col>
            <el-col :span="8" style="text-align: center">挖矿时间(小时)</el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="10">
            <el-col :span="8" style="text-align: center">
              <el-select v-model="test.form.num">
                <el-option
                  v-for="item in numList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" style="text-align: center">
              <el-select v-model="test.form.level">
                <el-option
                  v-for="item in levelDialogList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" style="text-align: center">
              <el-select v-model="test.form.time">
                <el-option
                  v-for="item in timeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="test.dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="testGold()">
          开始测试挖矿成果
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/static/manager/js/minerList.js"></script>
<style scoped></style>
