<template>
  <div class="table-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div style="float: left">
          <el-button type="primary" @click="showAddLimitDialog()">
            新增
          </el-button>
        </div>
        <div style="float: right">
          <el-date-picker
            v-model="index.queryForm.time_data"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input
            v-model="index.queryForm.searchText"
            class="searchText"
            placeholder="搜索关键字"
            @keyup.native.enter="index_handleQuery"
          /> -->
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
            label="id"
            min-width="5%"
          ></el-table-column>
          <el-table-column
            prop="time_data"
            label="日期"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            prop="limit_num"
            label="花样币限额"
            min-width="12%"
          ></el-table-column>
          <el-table-column
            prop="hsa_been_dig_flowers_coin_num"
            label="已挖取花样币"
            min-width="12%"
          ></el-table-column>
          <el-table-column label="操作" min-width="5%">
            <template slot-scope="scope">
              <el-button type="text" @click="showEditLimitDialog(scope.row)">
                编辑
              </el-button>
              <el-button type="text" @click="userMinerListBtn(scope.row)">
                挖取记录({{ scope.row.hsa_been_dig_flowers_coin_num }})
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

    <!-- 新增编辑花样币限额 -->
    <el-dialog
      :title="
        limit.dialog.title == 0 ? ' 新增花样币挖取额度' : '编辑花样币挖取额度'
      "
      :visible.sync="limit.dialog.visible"
      width="500px"
      @closed="$reset('limit.form')"
    >
      <el-form
        ref="limit.form"
        :model="limit.form"
        :rules="limit.formRules"
        label-width="110px"
      >
        <el-form-item label="日期：" prop="time_data">
          <el-date-picker
            v-model="limit.form.time_data"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="花样币额度：" prop="limit_num">
          <el-input v-model="limit.form.limit_num"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="limit.dialog.visible = false">取 消</el-button>
        <el-button
          v-if="limit.dialog.title == 0"
          type="primary"
          @click="addLimit()"
        >
          确 定
        </el-button>
        <el-button v-else type="primary" @click="editLimit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 挖取记录列表 -->
    <el-dialog
      title="挖取记录"
      :visible.sync="index.dialog.visible"
      width="1200px"
      @closed="$reset('index.form')"
    >
      <div>
        <el-row :gutter="10">
          <el-col :span="24" style="text-align: right; margin-bottom: 10px">
            <el-input
              v-model="record.queryForm.searchText"
              class="searchText"
              placeholder="请输入查询关键字"
              @keyup.native.enter="getFlowersCoinRecordList()"
            />
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              class="searchBtn"
              @click="getFlowersCoinRecordList()"
            >
              查询
            </el-button>
          </el-col>
        </el-row>

        <el-table
          ref="record.list"
          v-loading="record.table.loading"
          :data="record.table.list"
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :row-style="tableRowStyle"
          row-key="id"
          @selection-change="miner_handleSelectionChange"
        >
          <!-- <el-table-column
            type="selection"
            width="30"
            :reserve-selection="true"
          ></el-table-column> -->
          <el-table-column
            prop="get_time"
            label="挖取时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="user_id"
            label="用户id"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="nick_name"
            label="用户昵称"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="miner_id"
            label="矿工id"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="矿工名称"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column label="操作">
            <!-- <template slot-scope="scope">
              <el-button type="text" @click="userMinerListBtn(scope.row)">
                矿工列表({{ scope.row.miner_count }})
              </el-button>
            </template> -->
          </el-table-column>
        </el-table>

        <el-pagination
          style="text-align: right; margin-top: 10px"
          :current-page="record.queryForm.currentPage"
          :page-sizes="[10, 20, 30, 50, 80, 100]"
          :page-size="record.queryForm.pageSize"
          layout="total, prev, pager, next, sizes"
          :total="record.table.total"
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
  </div>
</template>

<script src="@/static/manager/js/huayangbiRecord.js"></script>
<style scoped></style>
