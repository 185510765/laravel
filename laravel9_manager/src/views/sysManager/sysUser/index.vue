<template>
  <div class="table-container">
    <el-row :gutter="10">
      <el-col :span="24">
        <div style="float: left">
          <!-- <el-button type="primary" @click="showAddSysUserDialog()">
            添加用户
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
        >
          <el-table-column
            type="selection"
            width="30"
            :reserve-selection="true"
          ></el-table-column>
          <el-table-column
            prop="id"
            label="id"
            min-width="4%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            min-width="10%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="real_name"
            label="真实姓名"
            min-width="8%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            min-width="10%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="qq"
            label="qq"
            min-width="7%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="reg_time"
            label="注册日期"
            min-width="10%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="last_login_time"
            label="最后登录时间"
            min-width="10%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="last_login_ip"
            label="最后登录ip"
            min-width="9%"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="8%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color: #67c23a">
                正常
              </span>
              <span v-else-if="scope.row.status == 1" style="color: #f56c6c">
                停用
              </span>
              <span v-else-if="scope.row.status == 2" style="color: #e6a23c">
                未激活
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="8%">
            <!-- <template slot-scope="scope">
              <el-button type="text" @click="showEditSysUserDialog(scope.row)">
                编辑
              </el-button>
              <el-button
                style="color: #f56c6c"
                type="text"
                @click="delSysUser(scope.row.dwSysUserID)"
              >
                删除
              </el-button>
            </template> -->
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
          :total="index.table.total"
          background
          @current-change="index_currentChange"
          @size-change="index_sizeChange"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- *************************************************** dialog ********************************************************************** -->

    <!-- 新增编辑系统用户dialog -->
    <el-dialog
      :title="index.dialog.title == 0 ? '添加用户' : '编辑用户'"
      :visible.sync="index.dialog.visible"
      width="500px"
      @closed="$reset('index.form')"
    >
      <el-form
        ref="index.form"
        :model="index.form"
        :rules="index.formRules"
        label-width="100px"
      >
        <el-form-item label="用户名：" prop="strSysLoginName">
          <el-input
            v-model="index.form.strSysLoginName"
            :disabled="index.dialog.title == 1"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="index.dialog.title == 0" label="密码：" prop="pwd">
          <el-input v-model="index.form.pwd"></el-input>
        </el-form-item>
        <el-form-item
          v-if="index.dialog.title == 0"
          label="确认密码："
          prop="confirmPwd"
        >
          <el-input v-model="index.form.confirmPwd"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="strSysRealName">
          <el-input v-model="index.form.strSysRealName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="strSysEmail">
          <el-input v-model="index.form.strSysEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="strSysPhone">
          <el-input v-model="index.form.strSysPhone"></el-input>
        </el-form-item>
        <el-form-item label="qq：" prop="dwSysQQ">
          <el-input v-model="index.form.dwSysQQ"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="index.dialog.visible = false">取 消</el-button>
        <el-button
          v-if="index.dialog.title == 0"
          type="primary"
          @click="addSysUser()"
        >
          确 定
        </el-button>
        <el-button
          v-if="index.dialog.title == 1"
          type="primary"
          @click="editSysUser()"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/static/manager/js/sysUser.js"></script>
