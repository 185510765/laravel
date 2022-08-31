import * as address from '@/api/address.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      index: {
        queryForm: {
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
      },

      address: {
        queryForm: {
          member_id: 0,
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

        form: {},
        formRules: {},
      },
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
      if (row.is_shelf == 0) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取用户列表
    async getUserList() {
      this.index.listLoading = true;
      const { data } = await address.getUserList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getUserList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getUserList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getUserList();
    },

    // 地址列表dialog
    showAddressListDialog(id) {
      this.address.dialog.visible = true;

      this.address.queryForm.member_id = id;
      this.address.queryForm.currentPage = 1;

      this.getAddressList();
    },

    // 获取地址列表
    async getAddressList() {
      this.address.listLoading = true;
      const { data } = await address.getAddressList(this.address.queryForm);
      this.address.listLoading = false;
      if (data) {
        this.address.list = data.list;
        this.address.total = data.total;
      }
    },

    // 搜索
    address_handleQuery() {
      this.address.queryForm.currentPage = 1;
      this.getAddressList();
    },

    // 页码切换
    address_currentChange(val) {
      this.address.queryForm.currentPage = val;
      this.getAddressList();
    },

    // 每页数量改变
    address_sizeChange(val) {
      this.address.queryForm.pageSize = val;
      this.getAddressList();
    },

    // *******************************************************************

    // 排序
    async sort(id, sort) {
      const params = {
        id: id,
        sort: sort,
      };
      const { data } = await address.sort(params);
      if (data) {
        this.$baseMessage('排序成功！', 'success');
        this.getAddressList();
      }
    },

    // 上下架
    async switchToggle(row) {
      const params = {
        id: row.id,
        is_shelf: row.is_shelf,
      };
      const { data } = await address.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 歌手图片 上传图片
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
      const { data } = await address.uploadImg(formData);
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

    // 新增商品dialog
    showAddAddressDialog() {
      this.index.form = this.$options.data().index.form;

      this.index.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 新增
    addAddress() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await address.addAddress(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('商品添加成功！', 'success');
            this.getAddressList();
          }
        } else {
          return false;
        }
      });
    },

    closeDialog() {
      this.imageList = [];
    },

    // 删除
    delAddress(id) {
      this.$baseConfirm('确定要删除当前商品吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await address.delAddress(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getAddressList();
        }
      });
    },

    // 编辑dialog
    showEditAddressDialog(row) {
      this.index.form = Object.assign({}, row);

      if (!isEmpty(row.goods_img)) {
        this.imageList.push({
          name: row.goods_img,
          url: row.goods_img,
        });
      }

      this.index.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑
    editAddress() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await address.editAddress(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getAddressList();
          }
        } else {
          return false;
        }
      });
    },
  },
};
