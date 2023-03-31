import * as userGame from '@/api/userGame.js';

export default {
  data() {
    return {
      // 用户列表
      queryUserForm: {
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },

      userList: [],
      total: 0,
      userListLoading: false,

      // 游戏列表
      dialogVisible: false,

      queryGameForm: {
        member_id: 0,
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },

      gameList: [],
      gameTotal: 0,
      gameListLoading: false,

      // 游戏记录
      recordDialogVisible: false,

      queryRecordForm: {
        member_id: 0,
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },

      gameRecordList: [],
      gameRecordTotal: 0,
      gameRecordListLoading: false,

      // 启动路径
      pathDialogVisible: false,

      queryPathForm: {
        member_id: 0,
        game_resources_id: 0,
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },

      gamePathList: [],
      gamePathTotal: 0,
      gamePathListLoading: false,

      game_name: '',
    };
  },
  mounted() {
    this.getUserList();
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

    // 获取用户列表
    async getUserList() {
      this.userListLoading = true;
      const { data } = await userGame.getUserList(this.queryUserForm);
      this.userListLoading = false;
      if (data) {
        this.userList = data.list;
        this.total = data.total;
      }
    },

    // 搜索
    userHandleQuery() {
      this.queryUserForm.currentPage = 1;
      this.getUserList();
    },

    // 页码切换
    currentChange(val) {
      this.queryUserForm.currentPage = val;
      this.getUserList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryUserForm.pageSize = val;
      this.getUserList();
    },

    // 游戏列表dialog
    showGameListDialog(id) {
      this.dialogVisible = true;
      this.queryGameForm.member_id = id;
      this.queryGameForm.currentPage = 1;

      this.getUserGameList();
    },

    // 获取用户游戏列表
    async getUserGameList() {
      this.gameListLoading = true;
      const { data } = await userGame.getUserGameList(this.queryGameForm);
      this.gameListLoading = false;
      if (data) {
        this.gameList = data.list;
        this.gameTotal = data.total;
      }
    },

    // 搜索
    gameHandleQuery() {
      this.queryGameForm.currentPage = 1;
      this.getUserGameList();
    },

    // 页码切换
    gameCurrentChange(val) {
      this.queryGameForm.currentPage = val;
      this.getUserGameList();
    },

    // 每页数量改变
    gameSizeChange(val) {
      this.queryGameForm.pageSize = val;
      this.getUserGameList();
    },

    // 游戏记录dialog
    showGameRecordDialog(id) {
      this.recordDialogVisible = true;
      this.queryRecordForm.member_id = id;
      this.queryRecordForm.currentPage = 1;

      this.getGameRecordList();
    },

    // 获取游戏记录列表
    async getGameRecordList() {
      this.gameRecordListLoading = true;
      const { data } = await userGame.getGameRecordList(this.queryRecordForm);
      this.gameRecordListLoading = false;
      if (data) {
        this.gameRecordList = data.list;
        this.gameRecordTotal = data.total;
      }
    },

    // 搜索
    gameRecordHandleQuery() {
      this.queryRecordForm.currentPage = 1;
      this.getGameRecordList();
    },

    // 页码切换
    gameRecordCurrentChange(val) {
      this.queryRecordForm.currentPage = val;
      this.getGameRecordList();
    },

    // 每页数量改变
    gameRecordSizeChange(val) {
      this.queryRecordForm.pageSize = val;
      this.getGameRecordList();
    },

    // 游戏启动路径
    showGamePathDialog(row) {
      this.pathDialogVisible = true;
      this.game_name = row.game_name;

      this.queryPathForm.member_id = row.member_id;
      this.queryPathForm.game_resources_id = row.game_resources_id;
      this.queryPathForm.currentPage = 1;

      this.getGamePathList();
    },

    // 获取游戏启动路径列表
    async getGamePathList() {
      this.gamePathListLoading = true;
      const { data } = await userGame.getGamePathList(this.queryPathForm);
      this.gamePathListLoading = false;
      if (data) {
        this.gamePathList = data.list;
        this.gamePathTotal = data.total;
      }
    },

    // 搜索
    gamePathHandleQuery() {
      this.queryPathForm.currentPage = 1;
      this.getGamePathList();
    },

    // 页码切换
    gamePathCurrentChange(val) {
      this.queryPathForm.currentPage = val;
      this.getGamePathList();
    },

    // 每页数量改变
    gamePathSizeChange(val) {
      this.queryPathForm.pageSize = val;
      this.getGamePathList();
    },
  },
};
