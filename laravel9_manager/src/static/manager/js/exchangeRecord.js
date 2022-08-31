import * as exchangeRecord from '@/api/exchangeRecord.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      index: {
        queryForm: {
          status: '',
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

        form: {
          name: '',
          img: '',
          price: 0,
          is_limit: 0,
          stock: 0,
        },
        formRules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入标价', trigger: 'blur' },
            // { validator: rule.checkNum, trigger: 'blur' },
          ],
        },

        imageGoodsList: [],
      },

      statusList: [
        { label: '全部', value: '' },
        { label: '待发货', value: 0 },
        { label: '已发货', value: 1 },
        { label: '已收货', value: 2 },
        { label: '售后', value: 3 },
      ],

      tableStatusList: [
        { label: '待发货', value: 0 },
        { label: '已发货', value: 1 },
        { label: '已收货', value: 2 },
        { label: '售后', value: 3 },
      ],

      imageList: [],
      dialogVisible: false,
      dialogImageUrl: '',
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
      if (row.status == -1) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取歌曲列表
    async getRecordList() {
      this.index.listLoading = true;
      const { data } = await exchangeRecord.getRecordList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;

        // 图片大图预览 imageRecordList
        this.index.list.forEach((element) => {
          if (!isEmpty(element.goods_img)) {
            this.index.imageGoodsList.push(element.goods_img);
          }
        });
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

    // 派送14天以上标记收货
    async changeStatus() {
      const { data } = await exchangeRecord.changeStatus();
      if (data) {
        this.$baseMessage(data.num + '个记录标记收货成功！', 'success');
        this.getRecordList();
      }
    },

    // 输入物流单号
    async inputTrackingNumber(id, tracking_number) {
      const params = {
        id: id,
        tracking_number: tracking_number,
      };
      const { data } = await exchangeRecord.inputTrackingNumber(params);
      if (data) {
        this.$baseMessage('快递单号输入成功！', 'success');
        this.getRecordList();
      }
    },

    // 状态切换
    async statusChange(id, status) {
      const params = {
        id: id,
        status: status,
      };
      const { data } = await exchangeRecord.statusChange(params);
      if (data) {
        this.$baseMessage('状态切换成功！', 'success');
        this.getRecordList();
      }
    },

    // 查看详情
    showDetailsDialog(row) {
      this.index.form = Object.assign({}, row);

      this.index.dialog.visible = true;
    },
  },
};
