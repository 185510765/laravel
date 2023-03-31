import * as advertising from '@/api/advertising.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      tabIndex: 0,
      tabList: [
        { label: '全部', id: 0 },
        { label: '客户端启动项广告', id: 1 },
        { label: '待定2', id: 2 },
        { label: '待定3', id: 3 },
      ],

      index: {
        queryForm: {
          type: 0,
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
          jump_url: '',
          introduce: '',
          type: 0,
        },
        formRules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          // price: [
          //   { required: true, message: '请输入标价', trigger: 'blur' },
          //   { validator: rule.checkNum, trigger: 'blur' },
          // ],
        },

        imageGameAdvertisingList: [],
      },

      imageList: [],
      dialogVisible: false,
      dialogImageUrl: '',

      typeList: [
        { label: '全部', value: 0 },
        { label: '客户端启动项广告', value: 1 },
        { label: '待定2', value: 2 },
        { label: '待定3', value: 3 },
      ],
    };
  },
  mounted() {
    this.getGameAdvertisingList();
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
      if (row.is_show == 0) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    tabClick() {
      this.index.queryForm.type = this.tabIndex;
      this.index.queryForm.currentPage = 1;
      this.getGameAdvertisingList();
    },

    // 获取广告列表
    async getGameAdvertisingList() {
      this.index.listLoading = true;
      const { data } = await advertising.getGameAdvertisingList(
        this.index.queryForm
      );
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;

        // 图片大图预览 imageGameAdvertisingList
        this.index.list.forEach((element) => {
          if (!isEmpty(element.advertising_img)) {
            this.index.imageGameAdvertisingList.push(element.advertising_img);
          }
        });
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getGameAdvertisingList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getGameAdvertisingList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getGameAdvertisingList();
    },

    // 排序
    async sort(id, sort) {
      const params = {
        id: id,
        sort: sort,
      };
      const { data } = await advertising.sort(params);
      if (data) {
        this.$baseMessage('排序成功！', 'success');
        this.getGameAdvertisingList();
      }
    },

    // 是否显示
    async switchToggle(row) {
      const params = {
        id: row.id,
        is_show: row.is_show,
      };
      const { data } = await advertising.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 广告图片 上传图片
    async uploadImg(params) {
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
      const { data } = await advertising.uploadImg(formData);
      if (data) {
        this.$baseMessage('图片上传成功', 'success');
        this.index.form.img = data.imgName;
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    closeDialog() {
      this.imageList = [];
    },

    // 新增广告dialog
    showAddGameAdvertisingDialog() {
      this.index.form = this.$options.data().index.form;

      this.index.dialog = {
        title: 0,
        visible: true,
      };

      this.index.form.type = parseInt(this.tabIndex);
    },

    // 新增广告
    addGameAdvertising() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await advertising.addGameAdvertising(
            this.index.form
          );
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('广告添加成功！', 'success');
            this.getGameAdvertisingList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除广告
    delGameAdvertising(id) {
      this.$baseConfirm('确定要删除当前广告吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await advertising.delGameAdvertising(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getGameAdvertisingList();
        }
      });
    },

    // 编辑广告dialog
    showEditGameAdvertisingDialog(row) {
      this.index.form = Object.assign({}, row);

      if (!isEmpty(row.advertising_img)) {
        this.imageList.push({
          name: row.advertising_img,
          url: row.advertising_img,
        });
      }

      this.index.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑广告
    editGameAdvertising() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await advertising.editGameAdvertising(
            this.index.form
          );
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getGameAdvertisingList();
          }
        } else {
          return false;
        }
      });
    },
  },
};
