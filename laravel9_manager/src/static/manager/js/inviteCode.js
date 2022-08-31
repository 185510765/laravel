import * as inviteCode from '@/api/inviteCode.js';
// import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
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
          dwInviteCodeID: 0,
          time: 120,
        },
        formRules: {
          time: [
            { required: true, message: '请输入有效时间', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },
      },
    };
  },
  mounted() {
    this.getInviteList();
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
      if (row.dwInviteStatus != 0) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取插件网吧配置列表
    async getInviteList() {
      this.index.listLoading = true;
      const { data } = await inviteCode.getInviteList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.table.list = data.list;
        this.index.table.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getInviteList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getInviteList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getInviteList();
    },

    // 添加邀请码dialog
    showAddInviteCodeDialog() {
      this.index.form = this.$options.data().index.form;

      this.index.dialog = {
        visible: true,
        title: 0,
      };
    },

    // 添加
    addInviteCode() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await inviteCode.addInviteCode(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('邀请码添加成功！', 'success');
            this.getInviteList();
          }
        } else {
          return false;
        }
      });
    },

    // 延时dialog
    showDelayInviteCodeDialog(dwInviteCodeID) {
      this.index.form.dwInviteCodeID = dwInviteCodeID;

      this.index.dialog = {
        visible: true,
        title: 1,
      };
    },

    // 延时
    delayInviteCode() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await inviteCode.delayInviteCode(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('延迟成功！', 'success');
            this.getInviteList();
          }
        } else {
          return false;
        }
      });
    },

    // 废弃
    abandon(dwInviteCodeID) {
      this.$baseConfirm('确定要废弃此邀请码吗？', '废弃提示', async () => {
        const params = {
          dwInviteCodeID: dwInviteCodeID,
        };
        const { data } = await inviteCode.abandon(params);
        if (data) {
          this.$baseMessage('废弃成功', 'success');
          this.getInviteList();
        }
      });
    },
  },
};
