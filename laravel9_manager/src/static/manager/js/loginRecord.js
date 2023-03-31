import * as loginRecord from '@/api/loginRecord.js';
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

        form: {},
        formRules: {
          integration: [
            { required: true, message: '请输入乐点', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },

        multipleSelection: [],
      },

      miner: {
        queryForm: {
          level: '',
          user_id: 0,
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

        form: {},
        formRules: {
          integration: [
            { required: true, message: '请输入乐点', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },

        multipleSelection: [],
      },

      levelList: [
        { label: '全部', value: '' },
        { label: '白色', value: 1 },
        { label: '绿色', value: 2 },
        { label: '蓝色', value: 3 },
        { label: '紫色', value: 4 },
        { label: '橙色', value: 5 },
      ],
    };
  },
  mounted() {
    this.getRecordList();
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

    // 获取记录列表
    async getRecordList() {
      this.index.table.loading = true;
      const { data } = await loginRecord.getRecordList(this.index.queryForm);
      this.index.table.loading = false;
      if (data) {
        this.index.table.list = data.list;
        this.index.table.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getRecordList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getRecordList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getRecordList();
    },

    // 表格checkbox选中
    index_handleSelectionChange(val) {
      this.index.multipleSelection = val;
    },

    // 记录矿工列表按钮
    userMinerListBtn(row) {
      this.index.dialog.visible = true;

      this.miner.queryForm.user_id = row.id;
      this.miner.queryForm.currentPage = 1;

      this.getUserMinerList(row);
    },

    // 获取记录矿工列表
    async getUserMinerList(row) {
      this.miner.table.loading = true;
      const { data } = await loginRecord.getUserMinerList(this.miner.queryForm);
      this.miner.table.loading = false;
      if (data) {
        this.miner.table.list = data.list;
        this.miner.table.total = data.total;
      }
    },

    // 搜索
    miner_handleQuery() {
      this.miner.queryForm.currentPage = 1;
      this.getUserMinerList();
    },

    // 页码切换
    miner_currentChange(val) {
      this.miner.queryForm.currentPage = val;
      this.getUserMinerList();
    },

    // 每页数量改变
    miner_sizeChange(val) {
      this.miner.queryForm.pageSize = val;
      this.getUserMinerList();
    },

    // 表格checkbox选中
    miner_handleSelectionChange(val) {
      this.miner.multipleSelection = val;
    },

    // // 记录编辑dialog
    // showEditUserBtn(row) {
    //   this.index.form = Object.assign({}, row);

    //   this.index.dialog.visible = true;
    // },

    // // 乐点修改dialog
    // showEditIntegrationDialogBtn(row) {
    //   this.index.form = Object.assign({}, row);

    //   this.integrationDialogVisible = true;
    // },

    // // 乐点修改
    // editIntegration() {
    //   this.$refs['index.form'].validate(async (valid) => {
    //     if (valid) {
    //       const params = {
    //         id: this.index.form.id,
    //         integration: this.index.form.integration,
    //       };

    //       const { data } = await loginRecord.editIntegration(params);
    //       if (data) {
    //         this.integrationDialogVisible = false;
    //         this.$baseMessage('乐点修改成功', 'success');
    //         this.getRecordList();
    //       }
    //     } else {
    //       return false;
    //     }
    //   });
    // },

    // // 积分查看dialog
    // showIntegralDialogBtn(row) {
    //   this.integraDialogVisible = true;
    // },
  },
};
