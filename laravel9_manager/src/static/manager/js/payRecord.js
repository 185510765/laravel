import * as PayOrderRecordList from '@/api/PayOrderRecordList.js';
import { isEmpty } from '@/utils/common.js';

import axios from 'axios';
import { baseURL } from '@/config';
import store from '@/store';
import { flatMap } from 'lodash';

export default {
  data() {
    return {
      tabIndex: '0',

      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setMonth(end.getMonth() + 1);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '上个月',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              start.setMonth(start.getMonth() - 1);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '今年至今',
            onClick(picker) {
              const start = new Date(new Date().getFullYear(), 0);
              const end = new Date();
              end.setMonth(end.getMonth() + 1);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              end.setMonth(end.getMonth() + 1);
              start.setMonth(start.getMonth() - 5);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },

      queryForm: {
        time: '',
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      paymentCheckList: [],
      paymentCheckListLoading: false,

      payDialogVisible: false,
      paymentForm: {},
      paymentFormRules: {
        pay_img: [{ required: true, message: '请导入凭证', trigger: 'blur' }],
      },
      uploadPayImgApi:
        process.env.VUE_APP_BASE_API +
        '/manager/PayOrderRecordList/uploadPayImg', // 凭证上传路径

      dialogImageUrl: '',
      dialogVisible: false,

      imgDialogImageUrl: '',
      imgDialogVisible: false,
      imageList: [],

      errorDialog: {
        visible: false,
        title: '',
        content: '',
      },
    };
  },
  created() {
    this.tabClick(0);
  },
  mounted() {},
  methods: {
    tabClick(val) {
      switch (parseInt(val)) {
        case 0:
          this.getPayRecordList();
          break;
        case 1:
          break;
      }
    },

    // 表头样式设置
    headClass() {
      return 'background:#FAFAFA;';
    },

    // 表格样式设置
    rowClass() {},

    // table 一行样式
    tableRowStyle({ row, rowIndex }) {
      const styleObj = {};
      if (row.status != 2) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取审核列表
    async getPayRecordList() {
      this.paymentCheckListLoading = true;
      const { data } = await PayOrderRecordList.getPayRecordList(
        this.queryForm
      );
      this.paymentCheckListLoading = false;
      if (data) {
        this.paymentCheckList = data.list;
        this.total = data.total;
      }
    },

    // 搜索
    handleQuery() {
      this.queryForm.currentPage = 1;
      this.getPayRecordList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getPayRecordList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getPayRecordList();
    },

    // 导入凭证 上传图片
    async uploadPayImg(params) {
      const file = params.file;
      // 校验
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png'
      ) {
        this.$message.error('图片只能是 JPG,PNG,JPEG 格式!');
        return;
      }
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 5MB!');
        return;
      }
      // 数据格式  文件对象
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await PayOrderRecordList.uploadPayImg(formData);
      if (data) {
        this.$baseMessage('凭证上传成功', 'success');
        this.paymentForm.pay_img = data.url;
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      this.paymentForm.pay_img = '';
    },

    // 支付dialog
    showPayDialog(row) {
      this.payDialogVisible = true;
      this.paymentForm = Object.assign({}, row);

      if (!isEmpty(this.paymentForm.pay_img)) {
        this.imageList.push({
          name: this.paymentForm.pay_img,
          url: this.paymentForm.pay_img,
        });
      }

      // 待支付状态才审核
      if (row.status == 2) {
        this.payBefore(row);
      }
    },

    // 支付前的验证
    async payBefore(row) {
      // 支付前的验证
      const params = {
        id: this.paymentForm.pay_cash_list_id,
        bar_id: this.paymentForm.bar_id,
        member_id: this.paymentForm.member_id,
      };
      axios({
        url: baseURL + '/manager/PayOrderRecordList/payBefore',
        method: 'post',
        headers: {
          Authorization: store.getters['user/accessToken'],
        },
        data: params,
      }).then((res) => {
        const { code, message } = res.data;
        if (code != 200) {
          this.errorDialog = {
            visible: true,
            title: message,
            content: '',
          };
        }
      });
    },

    // 支付
    pay() {
      this.$refs['paymentForm'].validate(async (valid) => {
        if (valid) {
          const params = {
            id: this.paymentForm.pay_cash_list_id,
            bar_id: this.paymentForm.bar_id,
            netbar_name: this.paymentForm.name,
            member_id: this.paymentForm.member_id,
            pay_img: this.paymentForm.pay_img,
            remark: this.paymentForm.remark,
            money_fen: this.paymentForm.money_fen,
            choose_type: this.paymentForm.choose_type,
            user_bank_service_charge: this.paymentForm.user_bank_service_charge,
            user_bank_service_money: this.paymentForm.user_bank_service_money,
            user_wechat_service_charge:
              this.paymentForm.user_wechat_service_charge,
            user_alipay_service_charge:
              this.paymentForm.user_alipay_service_charge,
            charge: this.paymentForm.charge,
            ali_trade_money_fen: this.paymentForm.ali_trade_money_fen,
            wechat_trade_money_fen: this.paymentForm.wechat_trade_money_fen,

            allMoney: this.paymentForm.allMoney,
            ali_money_fen: this.paymentForm.ali_money_fen,
            wx_money_fen: this.paymentForm.wx_money_fen,
            allMoney_after: this.paymentForm.allMoney_after,
            ali_money_fen_after: this.paymentForm.ali_money_fen_after,
            wechat_money_fen_after: this.paymentForm.wechat_money_fen_after,
          };
          const { data } = await PayOrderRecordList.pay(params);
          if (data) {
            this.$baseMessage('支付成功', 'success');
            this.payDialogVisible = false;
            this.getPayRecordList();
          }
        } else {
          return false;
        }
      });
    },

    // 撤销
    undo() {
      this.$baseConfirm('确定要撤销当前支付吗？', '撤销提示', async () => {
        const params = {
          id: this.paymentForm.pay_cash_list_id,
        };
        const { data } = await PayOrderRecordList.undo(params);
        if (data) {
          this.$baseMessage('撤销成功，请重新审核', 'success');
          this.payDialogVisible = false;
          this.getPayRecordList();
        }
      });
    },

    // 关闭dialog
    closeDialog() {
      this.imageList = [];
    },
  },
};
