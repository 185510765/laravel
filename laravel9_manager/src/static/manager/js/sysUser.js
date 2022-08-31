import * as sysUser from '@/api/sysUser.js';
// import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      if (value !== this.index.form.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      index: {
        queryForm: {
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        table: {
          total: 0,
          list: [],
          loading: false,
        },

        dialog: {
          title: 0,
          visible: false,
        },

        form: {
          strSysLoginName: '',
          pwd: '',
          confirmPwd: '',
          strSysRealName: '',
          strSysEmail: '',
          strSysPhone: '',
          dwSysQQ: '',
        },
        formRules: {
          strSysLoginName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: rule.checkUserName, trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: rule.checkPwd, trigger: 'blur' },
          ],
          confirmPwd: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePwd, trigger: 'blur' },
          ],
        },
      },
    };
  },
  mounted() {
    this.getSysUserList();
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
      // const styleObj = {};
      // if (row.dwSysStatus == 0) {
      //   styleObj.color = 'rgba(2, 2, 2, 0.4)';
      //   return styleObj;
      // }
      // return '';
    },

    // 获取系统用户列表
    async getSysUserList() {
      this.index.listLoading = true;
      const { data } = await sysUser.getSysUserList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.table.list = data.list;
        this.index.table.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getSysUserList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getSysUserList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getSysUserList();
    },

    // 状态切换
    async switchToggle(row) {
      const params = {
        dwSysUserID: row.dwSysUserID,
        dwSysStatus: row.dwSysStatus,
      };
      const { data } = await sysUser.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功', 'success');
      }
    },

    // 添加系统用户dialog
    showAddSysUserDialog() {
      this.index.form = this.$options.data().index.form;

      this.index.dialog = {
        visible: true,
        title: 0,
      };
    },

    // 添加用户
    addSysUser() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await sysUser.addSysUser(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('系统用户添加成功！', 'success');
            this.getSysUserList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除
    delSysUser(dwSysUserID) {
      this.$baseConfirm('确定要删除此用户吗？', '删除提示', async () => {
        const params = {
          dwSysUserID: dwSysUserID,
        };
        const { data } = await sysUser.delSysUser(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getSysUserList();
        }
      });
    },

    // 编辑dialog
    showEditSysUserDialog(row) {
      this.index.form = Object.assign({}, row);

      this.index.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑
    editSysUser() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await sysUser.editSysUser(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('系统用户编辑成功！', 'success');
            this.getSysUserList();
          }
        } else {
          return false;
        }
      });
    },
  },
};
