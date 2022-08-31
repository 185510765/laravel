import * as huayangbiRecord from '@/api/huayangbiRecord.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      // 初始数据
      init: {
        time_data: '',
        limit_num: 0,
      },

      index: {
        queryForm: {
          time_data: '',
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

      // 新增编辑花样币额度
      limit: {
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
          time_data: '2022-07-28',
          limit_num: 0,
        },
        formRules: {
          time_data: [
            { required: true, message: '请选择日期', trigger: 'blur' },
            // { validator: rule.checkNum, trigger: 'blur' },
          ],
          limit_num: [
            {
              required: true,
              message: '请输入花样币挖取额度',
              trigger: 'blur',
            },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },

        multipleSelection: [],
      },

      // 挖取记录
      record: {
        queryForm: {
          flowers_coin_config_id: 0,
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
        formRules: {},

        multipleSelection: [],
      },
    };
  },
  mounted() {
    this.getInitData();
    this.getHuayangbiRecordList();
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

    // 获取初始数据
    async getInitData() {
      const { data } = await huayangbiRecord.getInitData();
      if (data) {
        this.init = {
          time_data: data.time_data,
          limit_num: data.limit_num,
        };
      }
    },

    // 获取花样币记录列表
    async getHuayangbiRecordList() {
      this.index.table.loading = true;
      const { data } = await huayangbiRecord.getHuayangbiRecordList(
        this.index.queryForm
      );
      this.index.table.loading = false;
      if (data) {
        this.index.table.list = data.list;
        this.index.table.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getHuayangbiRecordList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getHuayangbiRecordList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getHuayangbiRecordList();
    },

    // 表格checkbox选中
    index_handleSelectionChange(val) {
      this.index.multipleSelection = val;
    },

    // 花样币挖取记录按钮
    userMinerListBtn(row) {
      this.index.dialog.visible = true;

      // this.record.queryForm = this.$options.data().record.queryForm;
      Object.assign(
        this.record.queryForm,
        this.$options.data().record.queryForm
      );
      this.record.queryForm.flowers_coin_config_id = row.id;

      this.getFlowersCoinRecordList(row);
    },

    // 获取花样币记录矿工列表
    async getFlowersCoinRecordList(row) {
      this.record.table.loading = true;
      const { data } = await huayangbiRecord.getFlowersCoinRecordList(
        this.record.queryForm
      );
      this.record.table.loading = false;
      if (data) {
        this.record.table.list = data.list;
        this.record.table.total = data.total;
      }
    },

    // 搜索
    miner_handleQuery() {
      this.record.queryForm.currentPage = 1;
      this.getFlowersCoinRecordList();
    },

    // 页码切换
    miner_currentChange(val) {
      this.record.queryForm.currentPage = val;
      this.getFlowersCoinRecordList();
    },

    // 每页数量改变
    miner_sizeChange(val) {
      this.record.queryForm.pageSize = val;
      this.getFlowersCoinRecordList();
    },

    // 表格checkbox选中
    miner_handleSelectionChange(val) {
      this.record.multipleSelection = val;
    },

    // 新增dialog
    showAddLimitDialog() {
      // Object.assign(this.limit.form, this.$options.data().limit.form);
      this.limit.form = this.init;

      this.limit.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 新增
    addLimit() {
      this.$refs['limit.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await huayangbiRecord.addLimit(this.limit.form);
          if (data) {
            this.limit.dialog.visible = false;
            this.$baseMessage('新增花样币挖取额度成功', 'success');
            this.getHuayangbiRecordList();
          }
        } else {
          return false;
        }
      });
    },

    // 编辑dialog
    showEditLimitDialog(row) {
      // this.limit.form = Object.assign({}, row);
      Object.assign(this.limit.form, row);

      this.limit.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 修改
    editLimit() {
      this.$refs['limit.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await huayangbiRecord.editLimit(this.limit.form);
          if (data) {
            this.limit.dialog.visible = false;
            this.$baseMessage('修改花样币挖取额度成功', 'success');
            this.getHuayangbiRecordList();
          }
        } else {
          return false;
        }
      });
    },
  },
};
