import * as report from '@/api/report.js';

export default {
  data() {
    return {
      tabIndex: 0,

      dealBtnLoading: false,

      // 上报数据
      index: {
        queryForm: {
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        dialog: {
          title: 0,
          visible: false,
        },

        total: 0,
        list: [],
        listLoading: false,

        form: {},
        formRules: [],
      },

      // 全部名单 白名单 黑名单
      match: {
        queryForm: {
          type: '',
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        dialog: {
          title: 0,
          visible: false,
        },

        total: 0,
        list: [],
        listLoading: false,

        form: {
          game_key_name: '',
          type: 0,
        },
        formRules: {
          game_key_name: [
            { required: true, message: '请输入名单关键字', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择名单类型', trigger: 'blur' },
          ],
        },
      },

      // 名单数据
      game: {
        queryForm: {
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        dialog: {
          title: 0,
          visible: false,
        },

        total: 0,
        list: [],
        listLoading: false,

        form: {},
        formRules: {},
      },

      typeList: ['', '', 0, 1],
    };
  },
  mounted() {
    this.getReportList();
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
      if (row.status == 2) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    tabClick() {
      this.index.queryForm.currentPage = 1;
      this.match.queryForm.currentPage = 1;
      this.game.queryForm.currentPage = 1;

      switch (parseInt(this.tabIndex)) {
        case 0: // 上报数据
          this.getReportList();
          break;
        case 1: // 全部名单
          this.getMatchList();
          break;
        case 2: // 白名单
          this.getMatchList();
          break;
        case 3: // 黑名单
          this.getMatchList();
          break;
        case 4: // 游戏数据
          this.getRecordGameList();
          break;
      }
    },

    // 获取上报列表
    async getReportList() {
      this.index.listLoading = true;
      const { data } = await report.getReportList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getReportList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getReportList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getReportList();
    },

    // 处理
    async deal(id) {
      const params = {
        id: id,
      };
      const { data } = await report.deal(params);
      if (data) {
        this.$baseMessage('操作成功', 'success');
        this.getReportList();
      }
    },

    // 一键处理
    async batchDeal() {
      this.dealBtnLoading = true;
      const { data } = await report.batchDeal();
      this.dealBtnLoading = false;
      if (data) {
        this.$baseMessage(data.num + ' 条黑名单数据已处理', 'success');
        this.getReportList();
      }
    },

    // *********************** 全部名单 白名单 黑名单 ***************************************

    // 获取名单列表
    async getMatchList() {
      this.match.queryForm.type = this.typeList[this.tabIndex];

      this.match.listLoading = true;
      const { data } = await report.getMatchList(this.match.queryForm);
      this.match.listLoading = false;
      if (data) {
        this.match.list = data.list;
        this.match.total = data.total;
      }
    },

    // 搜索
    match_handleQuery() {
      this.match.queryForm.currentPage = 1;
      this.getMatchList();
    },

    // 页码切换
    match_currentChange(val) {
      this.match.queryForm.currentPage = val;
      this.getMatchList();
    },

    // 每页数量改变
    match_sizeChange(val) {
      this.match.queryForm.pageSize = val;
      this.getMatchList();
    },

    // 切换名单状态
    async switchStatusToggle(row) {
      const params = {
        id: row.id,
        status: row.status,
      };
      const { data } = await report.switchStatusToggle(params);
      if (data) {
        this.$baseMessage('状态切换成功！', 'success');
      }
    },

    // 新增dialog
    showAddGameListDialog() {
      this.match.form = this.$options.data().match.form;

      this.match.form.type = parseInt(this.tabIndex) == 3 ? 1 : 0;

      this.match.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 新增名单
    addGameList() {
      this.$refs['match.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await report.addGameList(this.match.form);
          if (data) {
            this.match.dialog.visible = false;
            this.$baseMessage('名单添加成功！', 'success');
            this.getMatchList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除名单
    delGameList(id) {
      this.$baseConfirm('确定要删除当前名单吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await report.delGameList(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getMatchList();
        }
      });
    },

    // 编辑名单dialog
    showEditGameListDialog(row) {
      this.match.form = Object.assign({}, row);

      this.match.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑名单
    editGameList() {
      console.log(this.match.form);

      this.$refs['match.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await report.editGameList(this.match.form);
          if (data) {
            this.match.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getMatchList();
          }
        } else {
          return false;
        }
      });
    },

    // ************************************* 游戏数据 ************************************************
    async getRecordGameList() {
      this.game.listLoading = true;
      const { data } = await report.getRecordGameList(this.game.queryForm);
      this.game.listLoading = false;
      if (data) {
        this.game.list = data.list;
        this.game.total = data.total;
      }
    },

    // 搜索
    game_handleQuery() {
      this.game.queryForm.currentPage = 1;
      this.getRecordGameList();
    },

    // 页码切换
    game_currentChange(val) {
      this.game.queryForm.currentPage = val;
      this.getRecordGameList();
    },

    // 每页数量改变
    game_sizeChange(val) {
      this.game.queryForm.pageSize = val;
      this.getRecordGameList();
    },
  },
};
