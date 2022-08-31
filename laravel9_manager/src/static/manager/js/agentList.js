import * as agentList from '@/api/agentList.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      index: {
        queryForm: {
          dwAgentStatus: '',
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

        form: {},
        formRules: {
          integration: [
            { required: true, message: '请输入乐点', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },

        multipleSelection: [],
      },

      statusList: [
        { label: '全部', value: '' },
        { label: '停用', value: 0 },
        { label: '正常', value: 1 },
        { label: '未激活', value: 2 },
      ],
      tableStatusList: [
        { label: '停用', value: 0 },
        { label: '正常', value: 1 },
        { label: '未激活', value: 2 },
      ],

      integrationDialogVisible: false,
      integraDialogVisible: false,
    };
  },
  mounted() {
    this.getAgentList();
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

    // 获取代理商列表
    async getAgentList() {
      this.index.listLoading = true;
      const { data } = await agentList.getAgentList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getAgentList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getAgentList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getAgentList();
    },

    // 表格checkbox选中
    index_handleSelectionChange(val) {
      this.index.multipleSelection = val;
    },

    // 状态切换
    async statusSelect(dwAgentID, dwAgentStatus) {
      const params = {
        dwAgentID: dwAgentID,
        dwAgentStatus: dwAgentStatus,
      };
      const { data } = await agentList.statusSelect(params);
      if (data) {
        this.$baseMessage('用户状态切换成功', 'success');
      }
    },

    // ******************************************************************

    // 代理商编辑dialog
    showEditUserBtn(row) {
      this.index.form = Object.assign({}, row);

      this.index.dialog.visible = true;
    },

    // 强制登录代理商后台
    loginAdminBtn(row) {},

    // 乐点修改dialog
    showEditIntegrationDialogBtn(row) {
      this.index.form = Object.assign({}, row);

      this.integrationDialogVisible = true;
    },

    // 乐点修改
    editIntegration() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const params = {
            id: this.index.form.id,
            integration: this.index.form.integration,
          };

          const { data } = await agentList.editIntegration(params);
          if (data) {
            this.integrationDialogVisible = false;
            this.$baseMessage('乐点修改成功', 'success');
            this.getAgentList();
          }
        } else {
          return false;
        }
      });
    },

    // 积分查看dialog
    showIntegralDialogBtn(row) {
      this.integraDialogVisible = true;
    },
  },
};
