import * as PayCashList from '@/api/PayCashList.js';

export default {
  data() {
    return {
      statusList: [
        { label: '全部', value: '' },
        { label: '其他', value: 0 },
        { label: '待审核', value: 1 },
        // { label: '等待打款', value: 2 },
        // { label: '提现成功', value: 3 },
        // { label: '提现失败', value: 4 },
        { label: '审核失败', value: 5 },
      ],

      queryForm: {
        status: '',
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      paymentCheckList: [],
      paymentCheckListLoading: false,

      detailsVisible: false,
      paymentForm: {},
    };
  },
  created() {
    this.getTixianApplyList();
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
      if (row.status != 1) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取审核列表
    async getTixianApplyList() {
      this.paymentCheckListLoading = true;
      const { data } = await PayCashList.getTixianApplyList(this.queryForm);
      this.paymentCheckListLoading = false;
      if (data) {
        this.paymentCheckList = data.list;
        this.total = data.total;
      }
    },

    // 搜索
    handleQuery() {
      this.queryForm.currentPage = 1;
      this.getTixianApplyList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getTixianApplyList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getTixianApplyList();
    },

    // 查看详情
    showViewDetailsDialog(row) {
      this.detailsVisible = true;
      this.paymentForm = Object.assign({}, row);

      this.paymentForm.bMoney = this.checkBalanceMoney(row);

      if (!this.paymentForm.bMoney) {
        this.paymentForm.error_msg =
          row.choose_type_text + '余额小于提现金额，提现金额不足!';
      }
    },

    // 余额 是否大于提现金额
    checkBalanceMoney(row) {
      let bMoney = true;

      switch (parseInt(row.choose_type)) {
        case 0: // 银行卡
          bMoney =
            row.wx_money_fen * 100 + row.ali_money_fen * 100 >=
            row.money_fen * 100;
          break;
        case 1: // 微信
          bMoney = row.wx_money_fen * 100 >= row.money_fen * 100;
          break;
        case 2: // 支付宝
          bMoney = row.ali_money_fen * 100 >= row.money_fen * 100;
          break;
      }

      return bMoney;
    },

    // 审核
    async tixianCheck(status) {
      const params = {
        status: status,
        id: this.paymentForm.id,
        error_msg: this.paymentForm.error_msg,
        bar_id: this.paymentForm.bar_id,
        member_id: this.paymentForm.user_member_id,
        start_time: this.paymentForm.start_time,
      };
      const { data } = await PayCashList.tixianCheck(params);
      if (data) {
        this.$baseMessage('审核成功', 'success');
        this.detailsVisible = false;
        this.getTixianApplyList();
      }
    },
  },
};
