export default {
  data() {
    return {
      tabIndex: 0,
    };
  },
  mounted() {},
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

    tabClick() {},

    // 获取tab 游戏类型
    async getTabList() {
      const { data } = await gameList.getTabList();
      if (data) {
        this.ori_tabList = Object.assign({}, data.tabList);
        this.tabList = data.tabList;
      }
    },
  },
};
