import * as UmsMemberExt from '@/api/UmsMemberExt.js';

export default {
  data() {
    return {
      statusList: [
        { label: '全部', value: '' },
        { label: '未提交', value: 0 },
        { label: '待审核', value: 1 },
        { label: '审核不通过', value: 2 },
        { label: '审核通过', value: 3 },
      ],

      queryForm: {
        audit_status: '',
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      paymentCheckList: [],
      paymentCheckListLoading: false,

      detailsVisible: false,
      paymentForm: {},

      imageList: [],

      // imageList: {
      //   bank_licence_img: [],
      //   bank_card_img: [],
      //   person_id_card_positive_img: [],
      //   person_id_card_back_img: [],
      //   company_id_card_img: [],
      //   company_legal_person_id_card_positive_img: [],
      //   company_legal_person_id_card_back_img: [],
      //   bar_door_head_img: [],
      //   bar_door_inside_img: [],
      //   person_id_card_hand_img: [],
      //   wechat_img_value: [],
      // },
    };
  },
  created() {
    this.getPaymentApplyList();
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
      if (row.audit_status != 1) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 添加
    handleAdd() {},

    // 删除
    handleDel() {},

    // 修改
    handleEdit() {},

    // 获取审核列表
    async getPaymentApplyList() {
      this.paymentCheckListLoading = true;
      const { data } = await UmsMemberExt.getPaymentApplyList(this.queryForm);
      this.paymentCheckListLoading = false;
      if (data) {
        this.paymentCheckList = data.list;
        this.total = data.total;
      }
    },

    // 搜索
    handleQuery() {
      this.queryForm.currentChange = 1;
      this.getPaymentApplyList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getPaymentApplyList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getPaymentApplyList();
    },

    // 查看详情
    showViewDetailsDialog(row) {
      this.detailsVisible = true;
      this.paymentForm = Object.assign({}, row);

      // 图片预览 大图
      this.imagePreview(row);
      // this.imageList.push(row.bank_licence_img);
    },

    // 图片预览 大图
    imagePreview(row) {
      this.imageList.push(row.bank_licence_img);
      this.imageList.push(row.bank_card_img);
      this.imageList.push(row.person_id_card_positive_img);
      this.imageList.push(row.person_id_card_back_img);
      this.imageList.push(row.company_id_card_img);
      this.imageList.push(row.company_legal_person_id_card_positive_img);
      this.imageList.push(row.company_legal_person_id_card_back_img);
      this.imageList.push(row.bar_door_head_img);
      this.imageList.push(row.bar_door_inside_img);
      this.imageList.push(row.person_id_card_hand_img);
      this.imageList.push(row.wechat_img_value);

      // this.imageList.bank_licence_img.push(row.bank_licence_img);
      // this.imageList.bank_card_img.push(row.bank_card_img);
      // this.imageList.person_id_card_positive_img.push(
      //   row.person_id_card_positive_img
      // );
      // this.imageList.person_id_card_back_img.push(row.person_id_card_back_img);
      // this.imageList.company_id_card_img.push(row.company_id_card_img);
      // this.imageList.company_legal_person_id_card_positive_img.push(
      //   row.company_legal_person_id_card_positive_img
      // );
      // this.imageList.company_legal_person_id_card_back_img.push(
      //   row.company_legal_person_id_card_back_img
      // );
      // this.imageList.bar_door_head_img.push(row.bar_door_head_img);
      // this.imageList.bar_door_inside_img.push(row.bar_door_inside_img);
      // this.imageList.person_id_card_hand_img.push(row.person_id_card_hand_img);
      // this.imageList.wechat_img_value.push(row.wechat_img_value);
    },

    // 审核
    async paymentCheck(audit_status) {
      const params = {
        audit_status: audit_status,
        id: this.paymentForm.id,
        audit_remark: this.paymentForm.audit_remark,
      };
      const { data } = await UmsMemberExt.paymentCheck(params);
      if (data) {
        this.$baseMessage('审核成功', 'success');
        this.detailsVisible = false;
        this.getPaymentApplyList();
      }
    },
  },
};
