import * as minerList from '@/api/minerList.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      minerCount: {},

      index: {
        queryForm: {
          level: '',
          status: '',
          searchText: '',
          page: 1,
          size: 10,
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
          user_id: 0,
          searchText: '',
          page: 1,
          size: 10,
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
          id: 0,
          level: 1,
        },
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

      levelDialogList: [
        { label: '白色', value: 1 },
        { label: '绿色', value: 2 },
        { label: '蓝色', value: 3 },
        { label: '紫色', value: 4 },
        { label: '橙色', value: 5 },
      ],

      statusList: [
        { label: '全部', value: '' },
        { label: '空闲', value: 0 },
        { label: '挖矿中', value: 1 },
        { label: '被抓', value: 2 },
      ],

      // 模拟
      test: {
        dialog: {
          title: 0,
          visible: false,
        },

        form: {
          num: 10,
          level: 1,
          time: 1,
        },
        formRules: {},
      },

      numList: [
        { label: '1', value: 1 },
        { label: '3', value: 3 },
        { label: '5', value: 5 },
        { label: '10', value: 10 },
      ],

      timeList: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
      ],
    };
  },
  mounted() {
    this.getLevelMiner();
    this.getMinerList();
  },
  computed: {
    btnIsShow() {
      const permissions = this.$store.state.user.permissions;
      return permissions.indexOf('manager') != -1;
    },
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

    // 获取各种类型矿工数量
    async getLevelMiner() {
      const { data } = await minerList.getLevelMiner();
      if (data) {
        this.minerCount = data;
      }
    },

    // 获取矿工列表
    async getMinerList() {
      this.index.table.loading = true;
      const { data } = await minerList.getMinerList(this.index.queryForm);
      this.index.table.loading = false;
      if (data) {
        this.index.table.list = data.list;
        this.index.table.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.page = 1;
      this.getMinerList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.page = val;
      this.getMinerList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.size = val;
      this.getMinerList();
    },

    // 表格checkbox选中
    index_handleSelectionChange(val) {
      this.index.multipleSelection = val;
    },

    // 打开修改等级dialog
    showMinerInfoDialogBtn(row) {
      // Object.assign(this.miner.form, row);

      this.miner.form = {
        id: row.id,
        level: row.level,
      };

      this.miner.dialog = {
        visible: true,
        title: 0,
      };
    },

    // 修改矿工颜色等级
    async changeLevel() {
      const { data } = await minerList.changeLevel(this.miner.form);
      if (data) {
        this.miner.dialog.visible = false;
        this.$baseMessage('修改成功', 'success');
        this.getMinerList();
      }
    },

    // 模拟挖矿dialog
    showTestGoldDialog() {
      this.test.dialog.visible = true;
    },

    // 开始模拟挖矿
    async testGold() {
      const { data } = await minerList.testGold(this.test.form);
      if (data) {
      }
    },

    // 删除矿工
    delMiner(id) {
      this.$baseConfirm('确定要删除当前矿工吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await minerList.delMiner(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getMinerList();
        }
      });
    },
  },
};
